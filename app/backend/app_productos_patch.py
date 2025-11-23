# --- ESTE SCRIPT GENERA EL BLOQUE COMPLETO DE PRODUCTOS PARA TU BACKEND ---

print("🔧 Generando código actualizado para PRODUCTOS...")

codigo = r'''
# -------------------- PRODUCTOS -----------------------------

PRODUCTOS_FIELDS = [
    "id",
    "codigo_barra",
    "nombre",
    "descripcion",
    "categoria",
    "subcategoria",
    "precio",
    "imagen",
    "oferta",
    "nuevo",
    "mas_vendido",
    "marca",
    "unidad_medida",
    "stock",
    "estado",
]

def leer_productos():
    """
    Lee productos.csv sin descartar ninguna fila,
    normaliza tipos y completa columnas faltantes.
    """
    ensure_dir()
    productos = []

    if not os.path.exists(PRODUCTOS_FILE):
        return productos

    with open(PRODUCTOS_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            # Completar columnas faltantes
            for col in PRODUCTOS_FIELDS:
                if col not in row:
                    row[col] = ""

            # Normalizar precio
            try:
                row["precio"] = float(row.get("precio") or 0)
            except:
                row["precio"] = 0.0

            # Generar ID si falta
            if not row.get("id"):
                row["id"] = str(uuid.uuid4())

            # Normalizar valores a string
            for k, v in row.items():
                if v is None:
                    row[k] = ""
                else:
                    row[k] = str(v)

            productos.append(row)

    return productos


def guardar_productos(productos):
    """
    Guarda todos los productos sin perder columnas.
    """
    ensure_dir()

    with open(PRODUCTOS_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=PRODUCTOS_FIELDS)
        writer.writeheader()

        for p in productos:
            fila = {k: str(p.get(k, "")) for k in PRODUCTOS_FIELDS}
            writer.writerow(fila)
'''

with open("PRODUCTOS_PATCH.txt", "w", encoding="utf-8") as f:
    f.write(codigo)

print("""
✅ Listo Tino!
Se generó el archivo PRODUCTOS_PATCH.txt con el bloque corregido.

🟠 AHORA COPIÁ:
---------------------------------------
1) Abrí 'app.py'
2) Buscá la sección que empieza con:
      # -------------------- PRODUCTOS -----------------------------
3) BORRÁ TODO ESE BLOQUE COMPLETO
4) Pegá en su lugar lo que está dentro de:
      PRODUCTOS_PATCH.txt
---------------------------------------

🔥 Eso arregla todo el backend de productos y recupera el CSV.
""")
