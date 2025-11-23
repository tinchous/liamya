#!/bin/bash

# install-scripts.sh - Copiar todos los scripts a la carpeta app/
echo "📦 INSTALANDO SCRIPTS AUTOMÁTICOS..."

# Verificar que estamos en la carpeta correcta
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Debes ejecutar este script desde la carpeta app/"
    echo "📍 Estructura esperada:"
    echo "   app/"
    echo "   ├── frontend/"
    echo "   ├── backend/"
    echo "   └── scripts/"
    exit 1
fi

# Crear carpeta scripts si no existe
mkdir -p scripts

# Copiar scripts (asumiendo que están en la misma carpeta que este script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📁 Copiando scripts a ./scripts/..."
cp "$SCRIPT_DIR"/*.sh ./scripts/ 2>/dev/null || echo "⚠️  No se pudieron copiar scripts"

# Dar permisos
echo "🔒 Dando permisos de ejecución..."
chmod +x scripts/*.sh

# Crear enlaces simbólicos en la carpeta actual
echo "🔗 Creando enlaces simbólicos..."
ln -sf scripts/start-project.sh ./start.sh
ln -sf scripts/stop-project.sh ./stop.sh
ln -sf scripts/help-project.sh ./help.sh

echo ""
echo "✅ SCRIPTS INSTALADOS CORRECTAMENTE!"
echo "📍 Ahora puedes usar:"
echo "   ./start.sh    - Para iniciar el proyecto"
echo "   ./stop.sh     - Para detener el proyecto"
echo "   ./help.sh     - Para ver ayuda"
echo ""
echo "💡 También puedes ejecutar scripts individuales desde scripts/"
