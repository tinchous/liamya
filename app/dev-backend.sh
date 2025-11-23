#!/bin/bash

# dev-backend.sh - Desarrollo solo del backend
echo "🐍 INICIANDO MODO DESARROLLO BACKEND..."

cd backend

# Activar entorno virtual
if [ -d "venv" ]; then
    echo "🔧 Activando entorno virtual..."
    source venv/bin/activate
else
    echo "⚠️  No se encontró entorno virtual, usando Python del sistema"
fi

# Verificar dependencias
if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: No se encuentra requirements.txt"
    exit 1
fi

# Instalar dependencias si es necesario
echo "📦 Verificando dependencias..."
pip install -r requirements.txt

# Iniciar Flask
echo "🚀 Iniciando servidor Flask..."
python app.py
