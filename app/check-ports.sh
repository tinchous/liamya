#!/bin/bash

# check-ports.sh - Verificar puertos del proyecto
echo "🔍 VERIFICANDO PUERTOS DEL PROYECTO..."
echo "======================================"

ports=(5175 5174 5173 5000 5001 3000)

for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        process=$(lsof -Pi :$port -sTCP:LISTEN | grep LISTEN | awk '{print $1}')
        pid=$(lsof -Pi :$port -sTCP:LISTEN -t)
        echo "❌ Puerto $port: OCUPADO por $process (PID: $pid)"
    else
        echo "✅ Puerto $port: LIBRE"
    fi
done

echo ""
echo "💡 Para liberar puertos ejecuta: ./stop-project.sh"
