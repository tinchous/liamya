#!/bin/bash

# deploy-test.sh - Build de producción para pruebas
echo "🏗️  GENERANDO BUILD DE PRODUCCIÓN..."
echo "===================================="

cd frontend

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Build de producción
echo "🔨 Construyendo aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ BUILD EXITOSO!"
    echo "📍 Archivos en: frontend/dist/"
    echo "📍 Para previsualizar: npm run preview"
else
    echo "❌ ERROR en el build. Revisa los mensajes arriba."
fi
