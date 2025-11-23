#!/bin/bash

# logs-backend.sh - Ver logs en tiempo real del backend
echo "📊 VIENDO LOGS DEL BACKEND..."
cd backend

if [ ! -f "app.py" ]; then
    echo "❌ Backend no configurado. Ejecuta ./setup-project.sh primero."
    exit 1
fi

source venv/bin/activate 2>/dev/null || echo "⚠️  Usando Python del sistema"

# Ver logs en tiempo real de Flask
echo "🔍 Monitoreando logs de Flask..."
python app.py 2>&1 | tee -a backend.log
