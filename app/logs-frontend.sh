#!/bin/bash

# logs-frontend.sh - Ver logs en tiempo real del frontend
echo "📊 VIENDO LOGS DEL FRONTEND..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "❌ Frontend no configurado. Ejecuta ./setup-project.sh primero."
    exit 1
fi

# Ver logs en tiempo real del desarrollo
echo "🔍 Monitoreando logs de Vite..."
npm run dev 2>&1 | tee -a frontend.log
