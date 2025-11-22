import os
import csv
import json
import uuid
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS

# Si tienes instalado "requests" se usarán los mails de Resend.
# Si no, simplemente se ignoran sin romper nada.
try:
    import requests  # type: ignore
except ImportError:  # pragma: no cover
    requests = None

# ============================================================
# 🔧 CONFIGURACIÓN GENERAL
# ============================================================

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")

PRODUCTOS_FILE = os.path.join(DATA_DIR, "productos.csv")
PEDIDOS_FILE = os.path.join(DATA_DIR, "pedidos.csv")
USUARIOS_FILE = os.path.join(DATA_DIR, "usuarios.csv")
RECORD_FILE = os.path.join(DATA_DIR, "record.json")

# API key de Resend (a pedido del cliente, hardcodeada)
RESEND_API_KEY = "re_j8NHXAD2_K2ECBBacNA7DDdf7pnNqrS6rc"

# ============================================================
# 🧩 UTILIDADES CSV
# ============================================================

def ensure_dir():
    """Asegura que la carpeta data exista."""
    os.makedirs(DATA_DIR, exist_ok=True)


# -------------------- PRODUCTOS -----------------------------

PRODUCTOS_FIELDS = [
    "id",
    "nombre",
    "descripcion",
    "categoria",
    "subcategoria",
    "precio",
    "imagen",
    "mas_vendido",
    "oferta",
    "nuevo",
]


def leer_productos():
    """Lee productos.csv y devuelve una lista de dicts."""
    ensure_dir()
    productos = []
    if not os.path.exists(PRODUCTOS_FILE):
        return productos

    with open(PRODUCTOS_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not row.get("nombre"):
                continue
            try:
                # Normalizo tipos
                row["precio"] = float(row.get("precio") or 0)
            except ValueError:
                row["precio"] = 0.0
            # Relleno campos faltantes
            for k in PRODUCTOS_FIELDS:
                if k not in row:
                    row[k] = ""
            productos.append(row)
    return productos


def guardar_productos(productos):
    """Sobrescribe productos.csv con la lista dada."""
    ensure_dir()
    with open(PRODUCTOS_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=PRODUCTOS_FIELDS)
        writer.writeheader()
        for p in productos:
            fila = p.copy()
            # precio siempre como string al guardar
            fila["precio"] = str(fila.get("precio", 0))
            writer.writerow(fila)


# -------------------- USUARIOS ------------------------------

USUARIOS_FIELDS = [
    "id",
    "nombre",
    "telefono",
    "email",
    "direccion",
    "rol",
    "password",
    "metodo_pago",
    "suscrito_promos",
    "pedidos",
]


def leer_usuarios():
    """Lee usuarios.csv y devuelve lista de dicts."""
    ensure_dir()
    usuarios = []
    if not os.path.exists(USUARIOS_FILE):
        return usuarios

    with open(USUARIOS_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not row.get("id"):
                continue
            for k in USUARIOS_FIELDS:
                if k not in row:
                    row[k] = ""
            usuarios.append(row)
    return usuarios


def guardar_usuarios(usuarios):
    """Sobrescribe usuarios.csv completo."""
    ensure_dir()
    with open(USUARIOS_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=USUARIOS_FIELDS)
        writer.writeheader()
        for u in usuarios:
            fila = {k: u.get(k, "") for k in USUARIOS_FIELDS}
            writer.writerow(fila)


# -------------------- PEDIDOS -------------------------------

PEDIDOS_FIELDS = ["numero", "fecha", "cliente", "productos", "total"]


def leer_pedidos():
    """
    Lee pedidos.csv y devuelve lista de dicts:
    {
      numero, fecha, cliente(dict), productos(list), total(float)
    }
    """
    ensure_dir()
    pedidos = []
    if not os.path.exists(PEDIDOS_FILE):
        return pedidos

    with open(PEDIDOS_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                numero = (row.get("numero") or "").strip()
                fecha = (row.get("fecha") or "").strip()
                cliente_raw = row.get("cliente") or "{}"
                productos_raw = row.get("productos") or "[]"
                total = float(row.get("total") or 0)

                try:
                    cliente = json.loads(cliente_raw)
                except Exception:
                    cliente = {}
                try:
                    productos = json.loads(productos_raw)
                except Exception:
                    productos = []

                pedidos.append(
                    {
                        "numero": numero,
                        "fecha": fecha,
                        "cliente": cliente,
                        "productos": productos,
                        "total": total,
                    }
                )
            except Exception as e:  # pragma: no cover
                print("Error leyendo línea de pedidos.csv:", e, row)
    return pedidos


def guardar_pedido(pedido):
    """Agrega un pedido a pedidos.csv."""
    ensure_dir()
    existe = os.path.exists(PEDIDOS_FILE)
    with open(PEDIDOS_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=PEDIDOS_FIELDS)
        if not existe:
            writer.writeheader()
        fila = {
            "numero": pedido["numero"],
            "fecha": pedido["fecha"],
            "cliente": json.dumps(pedido["cliente"], ensure_ascii=False),
            "productos": json.dumps(pedido["productos"], ensure_ascii=False),
            "total": str(pedido["total"]),
        }
        writer.writerow(fila)


# ============================================================
# 📧 EMAILS CON RESEND
# ============================================================

def texto_pedido_desde_dict(pedido):
    """Genera el texto 'estilo WhatsApp' a partir de un dict pedido."""
    cli = pedido["cliente"]
    productos = pedido["productos"]
    total = float(pedido.get("total") or 0)

    subtotal = 0
    lineas_prod = []
    for p in productos:
        try:
            precio = float(p.get("precio") or 0)
            cantidad = int(p.get("quantity") or 0)
        except ValueError:
            precio = 0
            cantidad = 0
        subtotal += precio * cantidad
        linea = f"☐ {cantidad}x {p.get('nombre','')} - ${precio:.2f} c/u = *${precio*cantidad:.2f}*"
        lineas_prod.append(linea)

    # regla del delivery que venimos usando
    delivery = 50 if subtotal < 1500 else 0
    total_con_envio = subtotal + delivery

    detalle = "\n".join(lineas_prod)

    texto = (
        f"*PEDIDO WEB N° {pedido['numero']}*\n"
        f"═══════════════════════════════\n\n"
        f"*CLIENTE*\n"
        f"• Nombre: {cli.get('nombre','')}\n"
        f"• Teléfono: {cli.get('telefono','')}\n"
        f"• Email: {cli.get('email','')}\n\n"
        f"*ENTREGA*\n{cli.get('direccion','')}\n\n"
        f"*DETALLE DEL PEDIDO*\n{detalle}\n\n"
        f"*PAGO*\n"
        f"• Subtotal: ${subtotal:.2f}\n"
        f"• Delivery: ${delivery}\n"
        f"*TOTAL: ${total_con_envio:.2f}*\n\n"
        f"• Método: *{cli.get('metodo_pago','EFECTIVO')}*\n"
    )

    notas = cli.get("notas", "")
    if notas:
        texto += f"\n*NOTAS:*\n{notas}\n"

    texto += f"\n*Pedido web - {pedido['fecha']}*\n────────────────"
    return texto


def texto_a_html(texto):
    """Convierte el texto estilo WhatsApp a HTML simple."""
    # quitamos asteriscos y convertimos saltos de línea a <br>
    limpio = texto.replace("*", "")
    return "<br>".join(limpio.split("\n"))


# ============================================================
# 📧 ENVÍO DE EMAILS CON RESEND - IGUAL QUE MENSAJE WHATSAPP
# ============================================================
import resend

resend.api_key = "re_f8PRGqAB_Jx5QGfAbaPDAd43w951j6WSk"  # pon tu API key real aquí

def enviar_email_resend(pedido):
    """Envía un mail con el mismo formato del mensaje de WhatsApp."""

    cli = pedido["cliente"]
    correo = (cli.get("email") or "").strip()
    if not correo:
        print("❌ Pedido sin correo, no se envía email.")
        return

    # --- Datos del cliente ---
    cli_nombre = cli.get("nombre", "")
    cli_tel = cli.get("telefono", "")
    cli_email = cli.get("email", "")
    cli_dir = cli.get("direccion", "")
    cli_pago = cli.get("metodoPago", "EFECTIVO")
    cli_notas = cli.get("notas", "")
    total = pedido.get("total", 0)
    numero = pedido.get("numero", "")
    fecha = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    # --- Detalle del pedido ---
    detalle_html = ""
    subtotal = 0
    for item in pedido["productos"]:
        nombre = item.get("nombre", "")
        cantidad = int(item.get("quantity", 1))
        precio = float(item.get("precio", 0))
        subtotal += cantidad * precio
        detalle_html += f"☐ {cantidad}x {nombre} - ${precio:.2f} c/u = <b>${(precio * cantidad):.2f}</b><br>"

    delivery = 50 if subtotal < 1500 else 0
    total_final = subtotal + delivery

    # --- Mismo formato que WhatsApp ---
    html = f"""
    <div style="font-family: Arial, sans-serif; background-color: #fff; color: #000; padding: 20px; border-radius: 10px;">
      <h2 style="color:#ff8c00; text-align:center;">🧾 PEDIDO WEB N° {numero}</h2>
      <hr style="border:1px solid #ff8c00; margin:10px 0;">

      <p><b>CLIENTE</b><br>
      • Nombre: {cli_nombre}<br>
      • Teléfono: {cli_tel}<br>
      • Email: {cli_email}<br></p>

      <p><b>ENTREGA</b><br>
      {cli_dir}</p>

      <p><b>DETALLE DEL PEDIDO</b><br>
      {detalle_html}</p>

      <p><b>PAGO</b><br>
      • Subtotal: ${subtotal:.2f}<br>
      • Delivery: ${delivery}<br>
      • <b>TOTAL: ${total_final:.2f}</b><br>
      <br>
      • Método: <b>{cli_pago}</b><br></p>

      {f"<p><b>NOTAS:</b><br>{cli_notas}</p>" if cli_notas else ""}
      <hr style="border:1px solid #ff8c00; margin:10px 0;">
      <p style="color:#ff8c00; font-weight:bold;">Autoservice Liam Yahir<br>{fecha}</p>
    </div>
    """

    try:
        resend.Emails.send({
            "from": "Autoservice Liam Yahir <pedidos@liamyahir.delivery>",
            "to": [correo],
            "subject": f"Pedido Web {numero} - Autoservice Liam Yahir",
            "html": html,
            "reply_to": "pedidos@liamyahir.delivery",
        })
        print(f"📧 Email enviado correctamente a {correo}")
    except Exception as e:
        print(f"❌ Error enviando email con Resend: {e}")



# ============================================================
# 👥 SINCRONIZAR USUARIOS DESDE PEDIDO
# ============================================================

def actualizar_usuario_desde_pedido(pedido, rol_por_defecto, suscrito_promos):
    """
    Crea / actualiza un usuario a partir de un pedido.

    - Si ya existe por email (o teléfono sin email) se actualiza.
    - Se agrega el número de pedido a la columna "pedidos".
    """
    cli = pedido["cliente"]
    email = (cli.get("email") or "").strip().lower()
    telefono = (cli.get("telefono") or "").strip()
    direccion = cli.get("direccion") or ""
    nombre = cli.get("nombre") or ""
    metodo_pago = cli.get("metodo_pago") or "EFECTIVO"
    numero_pedido = pedido["numero"]
    suscrito_str = "si" if suscrito_promos else "no"

    usuarios = leer_usuarios()
    idx_encontrado = None

    for idx, u in enumerate(usuarios):
        u_email = (u.get("email") or "").strip().lower()
        u_tel = (u.get("telefono") or "").strip()
        if email and u_email == email:
            idx_encontrado = idx
            break
        if not email and telefono and u_tel == telefono:
            idx_encontrado = idx
            break

    if idx_encontrado is not None:
        u = usuarios[idx_encontrado]
        if nombre:
            u["nombre"] = nombre
        if telefono:
            u["telefono"] = telefono
        if email:
            u["email"] = email
        if direccion:
            u["direccion"] = direccion
        if metodo_pago:
            u["metodo_pago"] = metodo_pago

        # Si el rol actual es ADMINISTRADOR o SUPERVISOR no lo tocamos
        rol_actual = (u.get("rol") or "").upper()
        if rol_actual not in ["ADMINISTRADOR", "SUPERVISOR"]:
            u["rol"] = rol_por_defecto

        # Acumular pedidos
        existentes = [p.strip() for p in (u.get("pedidos") or "").split(",") if p.strip()]
        if numero_pedido not in existentes:
            existentes.append(numero_pedido)
        u["pedidos"] = ",".join(existentes)

        # Suscripción promos
        if suscrito_promos:
            u["suscrito_promos"] = "si"
        elif not u.get("suscrito_promos"):
            u["suscrito_promos"] = suscrito_str

        usuarios[idx_encontrado] = u
    else:
        # Crear nuevo usuario
        usuarios.append(
            {
                "id": str(uuid.uuid4()),
                "nombre": nombre,
                "telefono": telefono,
                "email": email,
                "direccion": direccion,
                "rol": rol_por_defecto,
                "password": "",
                "metodo_pago": metodo_pago,
                "suscrito_promos": suscrito_str,
                "pedidos": numero_pedido,
            }
        )

    guardar_usuarios(usuarios)


# ============================================================
# 🛒 ENDPOINTS DE PRODUCTOS
# ============================================================

@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(leer_productos())


@app.route("/api/products", methods=["POST"])
def create_product():
    data = request.get_json() or {}
    productos = leer_productos()

    nuevo = {
        "id": data.get("id") or str(uuid.uuid4()),
        "nombre": data.get("nombre", ""),
        "descripcion": data.get("descripcion", ""),
        "categoria": data.get("categoria", ""),
        "subcategoria": data.get("subcategoria", ""),
        "precio": float(data.get("precio") or 0),
        "imagen": data.get("imagen", ""),
        "mas_vendido": data.get("mas_vendido", "no"),
        "oferta": data.get("oferta", "no"),
        "nuevo": data.get("nuevo", "no"),
    }
    productos.append(nuevo)
    guardar_productos(productos)
    return jsonify({"status": "success", "producto": nuevo})


@app.route("/api/products/<product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json() or {}
    productos = leer_productos()
    actualizado = None

    for p in productos:
        if str(p.get("id")) == str(product_id):
            p["nombre"] = data.get("nombre", p["nombre"])
            p["descripcion"] = data.get("descripcion", p["descripcion"])
            p["categoria"] = data.get("categoria", p["categoria"])
            p["subcategoria"] = data.get("subcategoria", p["subcategoria"])
            p["precio"] = float(data.get("precio") or p["precio"])
            p["imagen"] = data.get("imagen", p["imagen"])
            p["mas_vendido"] = data.get("mas_vendido", p["mas_vendido"])
            p["oferta"] = data.get("oferta", p["oferta"])
            p["nuevo"] = data.get("nuevo", p["nuevo"])
            actualizado = p
            break

    if actualizado is None:
        return jsonify({"error": "Producto no encontrado"}), 404

    guardar_productos(productos)
    return jsonify({"status": "success", "producto": actualizado})


@app.route("/api/products/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    productos = leer_productos()
    nuevos = [p for p in productos if str(p.get("id")) != str(product_id)]

    if len(nuevos) == len(productos):
        return jsonify({"error": "Producto no encontrado"}), 404

    guardar_productos(nuevos)
    return jsonify({"status": "success"})


# ============================================================
# 👥 ENDPOINTS DE USUARIOS
# ============================================================

@app.route("/api/usuarios", methods=["GET"])
def api_get_usuarios():
    return jsonify(leer_usuarios())


@app.route("/api/usuarios", methods=["POST"])
def api_create_usuario():
    data = request.get_json() or {}
    usuarios = leer_usuarios()

    nuevo = {
        "id": str(uuid.uuid4()),
        "nombre": data.get("nombre", ""),
        "telefono": data.get("telefono", ""),
        "email": data.get("email", ""),
        # el formulario del admin usa "domicilio", lo mapeamos a "direccion"
        "direccion": data.get("direccion") or data.get("domicilio", ""),
        "rol": data.get("rol", "USUARIO REGISTRADO"),
        "password": data.get("password", ""),
        "metodo_pago": data.get("metodo_pago", ""),
        "suscrito_promos": data.get("suscrito_promos", "no"),
        "pedidos": data.get("pedidos", ""),
    }
    usuarios.append(nuevo)
    guardar_usuarios(usuarios)
    return jsonify({"status": "success", "usuario": nuevo})


@app.route("/api/usuarios/<user_id>", methods=["PUT"])
def api_update_usuario(user_id):
    data = request.get_json() or {}
    usuarios = leer_usuarios()
    actualizado = None

    for u in usuarios:
        if str(u.get("id")) == str(user_id):
            u["nombre"] = data.get("nombre", u["nombre"])
            u["telefono"] = data.get("telefono", u["telefono"])
            u["email"] = data.get("email", u["email"])
            u["direccion"] = data.get("direccion") or data.get("domicilio", u["direccion"])
            u["rol"] = data.get("rol", u["rol"])
            u["password"] = data.get("password", u["password"])
            u["metodo_pago"] = data.get("metodo_pago", u["metodo_pago"])
            u["suscrito_promos"] = data.get("suscrito_promos", u["suscrito_promos"])
            u["pedidos"] = data.get("pedidos", u["pedidos"])
            actualizado = u
            break

    if actualizado is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    guardar_usuarios(usuarios)
    return jsonify({"status": "success", "usuario": actualizado})


@app.route("/api/usuarios/<user_id>", methods=["DELETE"])
def api_delete_usuario(user_id):
    usuarios = leer_usuarios()
    nuevos = [u for u in usuarios if str(u.get("id")) != str(user_id)]

    if len(nuevos) == len(usuarios):
        return jsonify({"error": "Usuario no encontrado"}), 404

    guardar_usuarios(nuevos)
    return jsonify({"status": "success"})


# ============================================================
# 🧾 ENDPOINTS DE PEDIDOS
# ============================================================

@app.route("/api/pedidos", methods=["GET"])
def api_get_pedidos():
    """Devuelve todos los pedidos ya parseados."""
    return jsonify(leer_pedidos())


@app.route("/api/pedidos", methods=["POST"])
def api_create_pedido():
    """
    Espera JSON del frontend (Productos.jsx):

    {
      "cliente": {
        "nombre", "telefono", "email", "direccion",
        "metodoPago", "notas", "guardar_datos", "suscrito_promos"
      },
      "productos": [ {nombre, precio, quantity, ...}, ... ],
      "total": 1234.56,
      "guardar_datos": true/false   // opcional, redundante con cliente.guardar_datos
    }
    """
    data = request.get_json() or {}

    cliente_in = data.get("cliente") or {}
    productos = data.get("productos") or []
    total = float(data.get("total") or 0)

    # Flags
    guardar_datos = bool(
        data.get("guardar_datos") or cliente_in.get("guardar_datos")
    )
    suscrito_promos = bool(cliente_in.get("suscrito_promos") or data.get("suscrito_promos"))

    # Normalizamos cliente
    cliente = {
        "nombre": cliente_in.get("nombre", ""),
        "telefono": cliente_in.get("telefono", ""),
        "email": cliente_in.get("email", ""),
        "direccion": cliente_in.get("direccion", ""),
        "metodo_pago": cliente_in.get("metodoPago")
        or cliente_in.get("metodo_pago")
        or "EFECTIVO",
        "notas": cliente_in.get("notas", ""),
    }

    if not cliente["nombre"] or not cliente["telefono"]:
        return jsonify({"error": "Datos de cliente incompletos"}), 400

    if not productos:
        return jsonify({"error": "No hay productos en el pedido"}), 400

    numero = data.get("numero") or f"ORD-{int(datetime.now().timestamp()*1000)}"
    fecha = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    pedido = {
        "numero": numero,
        "fecha": fecha,
        "cliente": cliente,
        "productos": productos,
        "total": total,
    }

    # Guardar en CSV
    guardar_pedido(pedido)

    # Actualizar / crear usuario
    rol = "USUARIO REGISTRADO" if guardar_datos else "USUARIO INVITADO"
    actualizar_usuario_desde_pedido(pedido, rol, suscrito_promos)

    # Enviar mail de confirmación (si hay email)
    enviar_email_resend(pedido)

    return jsonify({"status": "success", "numero": numero})


# ============================================================
# 📊 DASHBOARD & REPORTES BÁSICOS
# ============================================================

@app.route("/api/dashboard", methods=["GET"])
def api_dashboard():
    pedidos = leer_pedidos()
    hoy = datetime.now().strftime("%d/%m/%Y")

    ventas_dia = 0.0
    pedidos_dia = 0
    delivery_dia = 0.0

    for p in pedidos:
        fecha_solo = p["fecha"].split(",")[0].strip()
        if fecha_solo == hoy:
            ventas_dia += float(p["total"] or 0)
            pedidos_dia += 1
            # misma lógica de delivery que usamos en el frontend
            # recalculamos por si acaso
            total = float(p["total"] or 0)
            # no sabemos el subtotal acá, así que asumimos misma regla:
            if total < 1500:
                delivery_dia += 50

    # récord histórico de ventas del día
    record_actual = 0.0
    nuevo_record = False
    if os.path.exists(RECORD_FILE):
        try:
            with open(RECORD_FILE, encoding="utf-8") as f:
                data = json.load(f)
                record_actual = float(data.get("record", 0))
        except Exception:
            record_actual = 0.0

    if ventas_dia > record_actual:
        nuevo_record = True
        with open(RECORD_FILE, "w", encoding="utf-8") as f:
            json.dump({"record": ventas_dia, "fecha": hoy}, f, indent=2, ensure_ascii=False)

    return jsonify(
        {
            "ventas_dia": round(ventas_dia, 2),
            "pedidos_dia": pedidos_dia,
            "delivery_dia": round(delivery_dia, 2),
            "nuevo_record": nuevo_record,
        }
    )


@app.route("/api/dashboard/ventas_mensuales", methods=["GET"])
def api_ventas_mensuales():
    pedidos = leer_pedidos()
    ahora = datetime.now()
    mes_actual = ahora.month
    anio_actual = ahora.year

    resumen = {}

    for p in pedidos:
        try:
            fecha_str = p["fecha"].split(",")[0].strip()
            fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
            if fecha.year == anio_actual and fecha.month == mes_actual:
                dia = fecha.day
                resumen[dia] = resumen.get(dia, 0) + float(p["total"] or 0)
        except Exception as e:  # pragma: no cover
            print("Error procesando pedido para ventas mensuales:", e, p)

    datos = [
        {"dia": dia, "ventas": round(total, 2)}
        for dia, total in sorted(resumen.items())
    ]
    return jsonify(datos)

# ============================================================
# 📊 REPORTES AVANZADOS (mejorado)
# ============================================================

@app.route("/api/reportes", methods=["GET"])
def api_reportes():
    pedidos = leer_pedidos()
    usuarios = leer_usuarios()

    # --- Filtros recibidos ---
    fecha_inicio = request.args.get("fecha_inicio")
    fecha_fin = request.args.get("fecha_fin")
    cliente = request.args.get("cliente", "").lower()
    rol = request.args.get("rol", "TODOS")
    categoria = request.args.get("categoria", "")
    producto = request.args.get("producto", "")

    def dentro_rango(p):
        """Filtra por fecha si corresponde."""
        try:
            f = datetime.strptime(p["fecha"].split(",")[0], "%d/%m/%Y")
            if fecha_inicio:
                fi = datetime.strptime(fecha_inicio, "%Y-%m-%d")
                if f < fi:
                    return False
            if fecha_fin:
                ff = datetime.strptime(fecha_fin, "%Y-%m-%d")
                if f > ff:
                    return False
        except Exception:
            pass
        return True

    pedidos_filtrados = []
    for p in pedidos:
        if fecha_inicio or fecha_fin:
            if not dentro_rango(p):
                continue
        if cliente and cliente not in p["nombre"].lower() and cliente not in p["email"].lower():
            continue
        if rol != "TODOS" and p.get("rol", "Desconocido") != rol:
            continue
        if categoria or producto:
            try:
                productos = json.loads(p["productos"])
            except:
                productos = p.get("productos", [])
            if categoria and not any((i.get("categoria") or "").upper() == categoria.upper() for i in productos):
                continue
            if producto and not any(producto.lower() in (i.get("nombre") or "").lower() for i in productos):
                continue
        pedidos_filtrados.append(p)

    total = sum(float(p.get("total", 0)) for p in pedidos_filtrados)
    cantidad = len(pedidos_filtrados)

    return jsonify({
        "pedidos": pedidos_filtrados,
        "total": total,
        "cantidad": cantidad
    })

# ============================================================
# 🚀 ARRANQUE
# ============================================================

if __name__ == "__main__":
    ensure_dir()
    app.run(debug=True, port=5000)
