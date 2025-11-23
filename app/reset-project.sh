#!/bin/bash

# reset-project.sh - Limpiar y reinstalar completamente
echo "🔄 REINICIANDO PROYECTO COMPLETAMENTE..."
echo "========================================"

# Detener procesos primero
./stop-project.sh

# Limpiar frontend
echo "🧹 Limpiando frontend..."
cd frontend
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm -f package-lock.json
cd ..

# Limpiar backend
echo "🧹 Limpiando backend..."
cd backend
rm -rf venv
rm -rf __pycache__
rm -rf instance
find . -name "*.pyc" -delete
cd ..

# Reinstalar
echo "📦 Reinstalando todo..."
./setup-project.sh

echo "✅ PROYECTO REINICIADO COMPLETAMENTE!"
echo "📍 Ejecuta ./start-project.sh para iniciar"
