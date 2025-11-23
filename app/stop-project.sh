#!/bin/bash

# stop-project.sh - Detiene frontend y backend
echo "🛑 DETENIENDO AUTOSERVICE LIAM YAHIR..."

# Matar procesos de Node.js (Vite)
pkill -f "vite" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null

# Matar procesos de Python (Flask)
pkill -f "python app.py" 2>/dev/null
pkill -f "flask" 2>/dev/null

# Matar procesos en puertos específicos
for port in 5175 5174 5173 5000 5001; do
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
        echo "✅ Puerto $25000 liberado"
    fi
done

echo "✅ Todos los procesos del proyecto han sido detenidos"
