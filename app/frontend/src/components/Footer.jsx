import React from 'react'
import { Phone, Clock, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t-8 border-orange-500 mt-auto">
      <div className="bg-gradient-to-r from-red-900 via-black to-red-900 py-12">
        <div className="max-w-7xl mx-auto text-center px-8">
          <h2 className="text-6xl md:text-8xl font-black text-orange-500 mb-8 neon-text">
            AUTO SERVICE LIAM YAHIR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white mb-8">
            <div className="flex items-center justify-center gap-4 text-3xl">
              <Clock className="w-12 h-12 text-orange-500" />
              <div>
                <p className="font-black">24HS TODOS LOS DÍAS</p>
                <p className="text-orange-400">Delivery 08:00 - 23:30</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-3xl">
              <Phone className="w-12 h-12 text-green-500" />
              <div>
                <p className="font-black">+598 92 308 828</p>
                <p className="text-green-400">WhatsApp Pedidos</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-3xl">
              <MapPin className="w-12 h-12 text-red-500" />
              <p className="font-black">Montevideo, Uruguay</p>
            </div>
          </div>
          <p className="text-4xl md:text-6xl font-black text-yellow-400 mt-12">
            TINU X SOLUCIONES © 2025 • EL NEÓN NUNCA SE APAGA
          </p>
        </div>
      </div>

      {/* WHATSAPP FLOTANTE VERDE - CORREGIDO 100% */}
      <a
        href="https://wa.me/59892308828"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:bottom-32 md:right-8 z-50 bg-green-600 p-6 rounded-full shadow-2xl hover:scale-125 transition border-8 border-white animate-bounce"
        aria-label="WhatsApp +598 92 308 828"
      >
        <Phone className="w-14 h-14 md:w-16 md:h-16 text-white" />
      </a>
    </footer>
  )
}
