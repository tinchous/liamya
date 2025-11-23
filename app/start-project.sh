#!/bin/bash

# start-project.sh - Inicia frontend y backend automáticamente
echo "🚀 INICIANDO AUTOSERVICE LIAM YAHIR..."
echo "=========================================="

# Verificar si estamos en la carpeta correcta
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Debes ejecutar este script desde la carpeta app/"
    exit 1
fi

# Función para matar procesos en puertos comunes
kill_port_process() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "🔫 Matando proceso en puerto $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
    fi
}

# Limpiar puertos
echo "🧹 Limpiando puertos..."
kill_port_process 5175
kill_port_process 5000
kill_port_process 5001

# Iniciar backend
echo "🐍 INICIANDO BACKEND..."
cd backend
source venv/bin/activate 2>/dev/null || echo "⚠️  Usando Python del sistema"
python app.py &
BACKEND_PID=$!
cd ..

# Esperar 3 segundos para que el backend inicie
echo "⏳ Esperando que el backend inicie..."
sleep 3

# Iniciar frontend
echo "⚛️  INICIANDO FRONTEND..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ PROYECTO INICIADO CORRECTAMENTE!"
echo "📍 Frontend: http://localhost:5175"
echo "📍 Backend:  http://localhost:5000"
echo "📍 Admin:    http://localhost:5175/admin/dashboard"
echo ""
echo "📝 Credenciales admin: usuario 'admin', contraseña 'admin'"
echo ""
echo "💡 Para detener: Ctrl+C o ejecutar ./stop-project.sh"
echo "=========================================="

# Esperar a que el usuario presione Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '👋 Proyecto detenido'; exit" INT
wait
