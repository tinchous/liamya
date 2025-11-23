import React from 'react'
import { ShoppingCart } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="pt-56 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-orange-700 drop-shadow-2xl animate-pulse">
            EL NEÓN VOLVIÓ
          </h1>
          <p className="text-3xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mt-8 drop-shadow-lg">
            24HS • DELIVERY • NUNCA MUERE
          </p>
          <div className="mt-16">
            <div className="inline-block p-8 bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl shadow-2xl hover:scale-110 transition transform cursor-pointer">
              <ShoppingCart className="w-32 h-32 md:w-48 md:h-48 text-white mx-auto" />
              <p className="text-4xl md:text-6xl font-black text-white mt-6">HACÉ TU PEDIDO YA</p>
            </div>
          </div>
          <p className="text-2xl md:text-4xl text-orange-400 mt-20 font-bold">
            TINU X SOLUCIONES © 2025 • EL NEÓN NUNCA SE APAGA
          </p>
        </div>
      </div>
      
      {/* CARRITO FLOTANTE QUE VUELA */}
    </>
  )
}
