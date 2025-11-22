#!/bin/bash
# ===============================================================
# Script: extender_backend_admin.sh
# Crea endpoints API para Usuarios, Categorías y Reportes (Pedidos)
# ===============================================================

APP_FILE="app.py"
DATA_DIR="data"
mkdir -p "$DATA_DIR"

# Hacemos copia de seguridad
cp "$APP_FILE" "$APP_FILE.bak_$(date +%s)"

echo "🧩 Extendiendo backend con Usuarios, Categorías y Reportes..."

cat >> "$APP_FILE" <<'EOF'

# ===============================================================
#  NUEVOS MÓDULOS ADMINISTRATIVOS
#  - USUARIOS
#  - CATEGORÍAS
#  - REPORTES / PEDIDOS
# ===============================================================

USERS_FILE = os.path.join(DATA_DIR, "usuarios.csv")
CATS_FILE = os.path.join(DATA_DIR, "categorias.csv")
ORDERS_FILE = os.path.join(DATA_DIR, "pedidos.csv")

# ---------------------------------------------------------------
#  USUARIOS
# ---------------------------------------------------------------
@app.route("/api/usuarios", methods=["GET"])
def get_usuarios():
    """Devuelve la lista de usuarios."""
    usuarios = []
    if not os.path.exists(USERS_FILE):
        return jsonify(usuarios)
    with open(USERS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader, start=1):
            usuarios.append({
                "id": i,
                "nombre": row.get("nombre", ""),
                "email": row.get("email", ""),
                "rol": row.get("rol", ""),
                "activo": row.get("activo", "si"),
            })
    return jsonify(usuarios)


@app.route("/api/usuarios", methods=["POST"])
def add_usuario():
    """Agrega un nuevo usuario."""
    data = request.json
    fieldnames = ["nombre", "email", "rol", "activo"]
    file_exists = os.path.exists(USERS_FILE)
    with open(USERS_FILE, "a", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow({
            "nombre": data.get("nombre", ""),
            "email": data.get("email", ""),
            "rol": data.get("rol", "Operador"),
            "activo": data.get("activo", "si"),
        })
    return jsonify({"status": "success", "message": "Usuario agregado"}), 201


@app.route("/api/usuarios/<int:user_id>", methods=["PUT"])
def update_usuario(user_id):
    """Actualiza un usuario por índice."""
    data = request.json
    usuarios = []
    if not os.path.exists(USERS_FILE):
        return jsonify({"status": "error", "message": "Archivo no encontrado"}), 404

    with open(USERS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        usuarios = list(reader)

    if user_id < 1 or user_id > len(usuarios):
        return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404

    usuarios[user_id - 1].update(data)
    with open(USERS_FILE, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["nombre", "email", "rol", "activo"])
        writer.writeheader()
        for u in usuarios:
            writer.writerow(u)

    return jsonify({"status": "success", "message": "Usuario actualizado"})


@app.route("/api/usuarios/<int:user_id>", methods=["DELETE"])
def delete_usuario(user_id):
    """Elimina un usuario por índice."""
    if not os.path.exists(USERS_FILE):
        return jsonify({"status": "error", "message": "Archivo no encontrado"}), 404

    with open(USERS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        usuarios = list(reader)

    if user_id < 1 or user_id > len(usuarios):
        return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404

    usuarios.pop(user_id - 1)
    with open(USERS_FILE, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["nombre", "email", "rol", "activo"])
        writer.writeheader()
        for u in usuarios:
            writer.writerow(u)

    return jsonify({"status": "success", "message": "Usuario eliminado"})


# ---------------------------------------------------------------
#  CATEGORÍAS
# ---------------------------------------------------------------
@app.route("/api/categorias", methods=["GET"])
def get_categorias():
    """Devuelve la lista de categorías."""
    categorias = []
    if not os.path.exists(CATS_FILE):
        return jsonify(categorias)
    with open(CATS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader, start=1):
            categorias.append({
                "id": i,
                "nombre": row.get("nombre", ""),
                "descripcion": row.get("descripcion", "")
            })
    return jsonify(categorias)


@app.route("/api/categorias", methods=["POST"])
def add_categoria():
    """Agrega una nueva categoría."""
    data = request.json
    fieldnames = ["nombre", "descripcion"]
    file_exists = os.path.exists(CATS_FILE)
    with open(CATS_FILE, "a", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow({
            "nombre": data.get("nombre", ""),
            "descripcion": data.get("descripcion", "")
        })
    return jsonify({"status": "success", "message": "Categoría agregada"}), 201


@app.route("/api/categorias/<int:cat_id>", methods=["PUT"])
def update_categoria(cat_id):
    """Actualiza una categoría."""
    data = request.json
    categorias = []
    if not os.path.exists(CATS_FILE):
        return jsonify({"status": "error", "message": "Archivo no encontrado"}), 404

    with open(CATS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        categorias = list(reader)

    if cat_id < 1 or cat_id > len(categorias):
        return jsonify({"status": "error", "message": "Categoría no encontrada"}), 404

    categorias[cat_id - 1].update(data)
    with open(CATS_FILE, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["nombre", "descripcion"])
        writer.writeheader()
        for c in categorias:
            writer.writerow(c)

    return jsonify({"status": "success", "message": "Categoría actualizada"})


@app.route("/api/categorias/<int:cat_id>", methods=["DELETE"])
def delete_categoria(cat_id):
    """Elimina una categoría."""
    if not os.path.exists(CATS_FILE):
        return jsonify({"status": "error", "message": "Archivo no encontrado"}), 404

    with open(CATS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        categorias = list(reader)

    if cat_id < 1 or cat_id > len(categorias):
        return jsonify({"status": "error", "message": "Categoría no encontrada"}), 404

    categorias.pop(cat_id - 1)
    with open(CATS_FILE, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["nombre", "descripcion"])
        writer.writeheader()
        for c in categorias:
            writer.writerow(c)

    return jsonify({"status": "success", "message": "Categoría eliminada"})


# ---------------------------------------------------------------
#  REPORTES / PEDIDOS
# ---------------------------------------------------------------
@app.route("/api/reportes/pedidos", methods=["GET"])
def get_reportes_pedidos():
    """Devuelve pedidos del archivo CSV con filtro opcional por fechas."""
    pedidos = []
    fecha_inicio = request.args.get("desde")
    fecha_fin = request.args.get("hasta")

    if not os.path.exists(ORDERS_FILE):
        return jsonify(pedidos)

    with open(ORDERS_FILE, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            fecha = row.get("fecha", "")
            if fecha_inicio and fecha < fecha_inicio:
                continue
            if fecha_fin and fecha > fecha_fin:
                continue
            pedidos.append(row)

    return jsonify(pedidos)
EOF

echo "✅ Backend extendido correctamente. Reiniciá con: python3 app.py"
