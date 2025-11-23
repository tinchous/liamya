#!/bin/bash

# setup-project.sh - Configuración completa del proyecto
echo "🛠️  CONFIGURACIÓN INICIAL DE AUTOSERVICE LIAM YAHIR"
echo "=================================================="

# Verificar Python
echo "🔍 Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no está instalado. Instala Python 3.8+ primero."
    exit 1
fi

# Verificar Node.js
echo "🔍 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instala Node.js 16+ primero."
    exit 1
fi

# Configurar backend
echo "🐍 CONFIGURANDO BACKEND..."
cd backend

# Crear entorno virtual
if [ ! -d "venv" ]; then
    echo "🔧 Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar y instalar dependencias
source venv/bin/activate
echo "📦 Instalando dependencias Python..."
pip install --upgrade pip
pip install -r requirements.txt

# Configurar frontend
echo "⚛️  CONFIGURANDO FRONTEND..."
cd ../frontend

# Instalar dependencias Node.js
echo "📦 Instalando dependencias Node.js..."
npm install

# Instalar dependencias adicionales comunes
echo "📦 Instalando dependencias adicionales..."
npm install canvas-confetti axios

echo ""
echo "✅ CONFIGURACIÓN COMPLETADA!"
echo "📍 Ejecuta ./start-project.sh para iniciar el proyecto"
echo "=================================================="
