import React from 'react'

export default function TailwindTest() {
  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-4xl font-bold text-neonOrange text-center mb-8">
        🎨 Prueba de Tailwind CSS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-neonGreen">
          <h2 className="text-neonGreen text-xl font-bold">Texto Neon Verde</h2>
          <p className="text-white">Clases de Tailwind funcionando</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-neonBlue">
          <h2 className="text-neonBlue text-xl font-bold">Texto Neon Azul</h2>
          <p className="text-white">Grid y responsive</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-neonPurple">
          <h2 className="text-neonPurple text-xl font-bold">Texto Neon Púrpura</h2>
          <p className="text-white">Colores personalizados</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border-2 border-neonRed">
          <h2 className="text-neonRed text-xl font-bold">Texto Neon Rojo</h2>
          <p className="text-white">Todo configurado</p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-green-400 text-lg">✅ Si ves colores neón y diseño, Tailwind está funcionando</p>
        <p className="text-red-400 text-lg">❌ Si no ves colores, hay un problema</p>
      </div>
    </div>
  )
}
