#!/bin/bash

# dev-frontend.sh - Desarrollo solo del frontend
echo "⚛️  INICIANDO MODO DESARROLLO FRONTEND..."

cd frontend

# Limpiar cache de Vite
echo "🧹 Limpiando cache de Vite..."
rm -rf .vite 2>/dev/null

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar desarrollo
echo "🚀 Iniciando servidor de desarrollo..."
npm run dev
