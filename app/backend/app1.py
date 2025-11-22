# ==========================================================
# app.py – Backend principal con Reportes Avanzados
# ==========================================================
import os
import csv
import json
import uuid
import requests
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

# ----------------------------------------------------------
# 🔧 Configuración básica de Flask
# ----------------------------------------------------------
app = Flask(__name__)
CORS(app)

# ----------------------------------------------------------
# 📁 Rutas de archivos CSV
# ----------------------------------------------------------
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

PRODUCTOS_FILE = os.path.join(DATA_DIR, "productos.csv")
PEDIDOS_FILE = os.path.join(DATA_DIR, "pedidos.csv")
USUARIOS_FILE = os.path.join(DATA_DIR, "usuarios.csv")

# ----------------------------------------------------------
# ✉️ Configuración de Resend (correo)
# ----------------------------------------------------------
RESEND_API_KEY = "re_j8NHXAD2_K2ECBBacNA7DDdf7pnNqrS6rc"
RESEND_URL = "https://api.resend.com/emails"

# ----------------------------------------------------------
# ⚙️ Funciones auxiliares
# ----------------------------------------------------------
def leer_csv(path):
    """Lee un CSV y devuelve una lista de diccionarios."""
    datos = []
    if not os.path.exists(path):
        return datos
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            datos.append(row)
    return datos


def escribir_csv(path, fieldnames, rows):
    """Escribe una lista de diccionarios en CSV (sobrescribe)."""
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def agregar_linea_csv(path, fieldnames, row):
    """Agrega una nueva línea al CSV (crea el archivo si no existe)."""
    file_exists = os.path.exists(path)
    with open(path, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(row)


# ==========================================================
# 🧃 API: Productos
# ==========================================================
@app.route("/api/products", methods=["GET"])
def get_products():
    """Devuelve la lista de productos desde productos.csv"""
    productos = leer_csv(PRODUCTOS_FILE)
    return jsonify(productos)


# ==========================================================
# 🧾 API: Pedidos (GET / POST)
# ==========================================================
@app.route("/api/pedidos", methods=["GET", "POST"])
def pedidos():
    # -----------------------------------
    # 🟢 GET → listar todos los pedidos
    # -----------------------------------
    if request.method == "GET":
        pedidos = leer_csv(PEDIDOS_FILE)
        return jsonify(pedidos)

    # -----------------------------------
    # 🟠 POST → registrar nuevo pedido
    # -----------------------------------
    elif request.method == "POST":
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400

        numero_pedido = "ORD-" + str(uuid.uuid4().int)[:12]
        fecha = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

        cliente = data.get("nombre", "Sin nombre")
        telefono = data.get("telefono", "")
        email = data.get("email", "")
        direccion = data.get("direccion", "")
        metodo_pago = data.get("metodo_pago", "")
        notas = data.get("notas", "")
        guardar_datos = data.get("guardar_datos", False)
        suscrito_promos = data.get("suscrito_promos", False)
        productos = data.get("productos", [])
        total = data.get("total", 0)

        # Guardar pedido en pedidos.csv
        pedido_row = {
            "numero": numero_pedido,
            "fecha": fecha,
            "nombre": cliente,
            "telefono": telefono,
            "email": email,
            "direccion": direccion,
            "metodo_pago": metodo_pago,
            "notas": notas,
            "productos": json.dumps(productos, ensure_ascii=False),
            "total": total,
            "rol": "Usuario Registrado" if guardar_datos else "Usuario Invitado",
        }

        agregar_linea_csv(
            PEDIDOS_FILE,
            [
                "numero",
                "fecha",
                "nombre",
                "telefono",
                "email",
                "direccion",
                "metodo_pago",
                "notas",
                "productos",
                "total",
                "rol",
            ],
            pedido_row,
        )

        # Guardar o actualizar usuario si eligió "guardar mis datos"
        if guardar_datos:
            usuarios = leer_csv(USUARIOS_FILE)
            existente = next((u for u in usuarios if u["email"] == email), None)
            if existente:
                existente.update(
                    {
                        "nombre": cliente,
                        "telefono": telefono,
                        "direccion": direccion,
                        "metodo_pago": metodo_pago,
                        "suscrito_promos": "si" if suscrito_promos else "no",
                    }
                )
            else:
                usuarios.append(
                    {
                        "id": str(uuid.uuid4()),
                        "nombre": cliente,
                        "telefono": telefono,
                        "email": email,
                        "direccion": direccion,
                        "rol": "Usuario Registrado",
                        "metodo_pago": metodo_pago,
                        "suscrito_promos": "si" if suscrito_promos else "no",
                        "pedidos": numero_pedido,
                    }
                )
            escribir_csv(
                USUARIOS_FILE,
                [
                    "id",
                    "nombre",
                    "telefono",
                    "email",
                    "direccion",
                    "rol",
                    "metodo_pago",
                    "suscrito_promos",
                    "pedidos",
                ],
                usuarios,
            )

        # ✉️ Enviar correo con Resend
        mensaje_html = data.get("mensaje_html", "")
        try:
            payload = {
                "from": "Autoservice Liam Yahir <pedidos@resend.dev>",
                "to": [email] if email else ["autoserviceliamyahir@gmail.com"],
                "subject": f"Confirmación de tu pedido {numero_pedido}",
                "html": mensaje_html
                or f"<p>Gracias por tu pedido {cliente}. Total: ${total}</p><p>Autoservice Liam Yahir</p>",
            }
            headers = {
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            }
            requests.post(RESEND_URL, headers=headers, json=payload)
            print(f"✅ Correo enviado con Resend a {email}")
        except Exception as e:
            print(f"⚠️ Error enviando correo con Resend: {e}")

        return jsonify({"success": True, "numero": numero_pedido}), 201


# ==========================================================
# 📊 API: Dashboard general (ventas del día)
# ==========================================================
@app.route("/api/dashboard")
def dashboard():
    pedidos = leer_csv(PEDIDOS_FILE)
    hoy = datetime.now().strftime("%d/%m/%Y")

    ventas_dia = 0
    pedidos_dia = 0
    delivery_dia = 0

    for p in pedidos:
        if p["fecha"].startswith(hoy):
            ventas_dia += float(p["total"])
            pedidos_dia += 1
            if float(p["total"]) < 1500:
                delivery_dia += 50

    return jsonify(
        {
            "ventas_dia": round(ventas_dia, 2),
            "pedidos_dia": pedidos_dia,
            "delivery_dia": round(delivery_dia, 2),
        }
    )


# ==========================================================
# 📈 API: Ventas mensuales (para gráfico)
# ==========================================================
@app.route("/api/dashboard/ventas_mensuales")
def ventas_mensuales():
    pedidos = leer_csv(PEDIDOS_FILE)
    ahora = datetime.now()
    mes_actual = ahora.month
    anio_actual = ahora.year
    resumen = {}

    for p in pedidos:
        try:
            fecha_str = p["fecha"].split(",")[0]
            fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
            if fecha.month == mes_actual and fecha.year == anio_actual:
                dia = fecha.day
                resumen[dia] = resumen.get(dia, 0) + float(p["total"])
        except Exception as e:
            print(f"Error procesando pedido: {e}")

    datos = [
        {"dia": dia, "ventas": round(total, 2)} for dia, total in sorted(resumen.items())
    ]
    return jsonify(datos)


# ==========================================================
# 🧮 API: Reportes avanzados
# ==========================================================
@app.route("/api/reportes")
def reportes():
    """
    Permite filtrar reportes avanzados por:
      - rango de fechas (fecha_inicio, fecha_fin)
      - nombre o email del cliente
      - rol (Administrador, Invitado, Registrado)
      - categoría o producto (analiza JSON de productos)
    """
    pedidos = leer_csv(PEDIDOS_FILE)
    fecha_inicio = request.args.get("fecha_inicio")
    fecha_fin = request.args.get("fecha_fin")
    cliente = request.args.get("cliente", "").lower()
    rol = request.args.get("rol", "").lower()
    categoria = request.args.get("categoria", "").lower()
    producto = request.args.get("producto", "").lower()

    resultados = []

    for p in pedidos:
        try:
            fecha_str = p["fecha"].split(",")[0]
            fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
            if fecha_inicio and fecha < datetime.strptime(fecha_inicio, "%d/%m/%Y"):
                continue
            if fecha_fin and fecha > datetime.strptime(fecha_fin, "%d/%m/%Y"):
                continue
            if cliente and cliente not in p["nombre"].lower() and cliente not in p["email"].lower():
                continue
            if rol and rol not in p["rol"].lower():
                continue

            if categoria or producto:
                lista = json.loads(p["productos"])
                if categoria:
                    coincide = any(
                        categoria in (item.get("categoria", "").lower())
                        for item in lista
                    )
                    if not coincide:
                        continue
                if producto:
                    coincide = any(
                        producto in (item.get("nombre", "").lower())
                        for item in lista
                    )
                    if not coincide:
                        continue

            resultados.append(p)
        except Exception as e:
            print("Error procesando pedido:", e)

    total = sum(float(r["total"]) for r in resultados)
    return jsonify({"total": round(total, 2), "cantidad": len(resultados), "pedidos": resultados})

# ============================================================
# 📁 RUTA: /api/usuarios
# - Devuelve todos los usuarios desde data/usuarios.csv
# ============================================================
@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = []
    try:
        ruta_usuarios = os.path.join(DATA_DIR, 'usuarios.csv')
        with open(ruta_usuarios, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                usuarios.append(row)
        return jsonify(usuarios), 200
    except FileNotFoundError:
        return jsonify({"error": "Archivo usuarios.csv no encontrado en data/"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al leer usuarios.csv: {str(e)}"}), 500


# ==========================================================
# 🚀 Inicio del servidor
# ==========================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
