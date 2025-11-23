import React from 'react'
import { Phone, Clock, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t-8 border-orange-500 mt-auto rounded-t-3xl">
      <div className="bg-gradient-to-r from-red-900 via-black to-red-900 py-12 rounded-t-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8 text-white">
          <div>
            <h3 className="text-2xl font-black text-orange-400 mb-4">Autoservice Liam Yahir</h3>
            <p className="text-sm text-zinc-300">Supermercado, kiosko, rotisería y delivery LiamYA ir para todo Montevideo.</p>
          </div>
          <div>
            <h4 className="text-xl font-black text-orange-300 mb-3">Datos</h4>
            <p className="flex items-center gap-2 text-sm"><Phone className="w-4" /> +598 92 308 828</p>
            <p className="flex items-center gap-2 text-sm"><Mail className="w-4" /> autoserviceliamyahir@gmail.com</p>
            <p className="flex items-center gap-2 text-sm"><MapPin className="w-4" /> Montevideo, Uruguay</p>
            <p className="flex items-center gap-2 text-sm"><Clock className="w-4" /> Abierto 24hs</p>
          </div>
          <div>
            <h4 className="text-xl font-black text-orange-300 mb-3">Menú rápido</h4>
            <ul className="space-y-2 text-sm text-zinc-200">
              <li><a href="/delivery" className="hover:text-orange-400">LiamYA ir</a></li>
              <li><a href="/categorias" className="hover:text-orange-400">Rotisería</a></li>
              <li><a href="/productos" className="hover:text-orange-400">Frutas & Verduras</a></li>
              <li><a href="/dashboard" className="hover:text-orange-400">Mi cuenta</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-black text-orange-300 mb-3">Trabajá con nosotros</h4>
            <p className="text-sm text-zinc-200">Enviá tu CV y sumate al equipo de supervisores y empleados.</p>
            <a href="mailto:autoserviceliamyahir@gmail.com" className="inline-block mt-3 px-4 py-2 bg-orange-500 text-black font-black rounded-2xl">Enviar CV</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-300">
          <div className="space-x-4 mb-3 md:mb-0">
            <a href="#" className="hover:text-orange-400">Términos</a>
            <a href="#" className="hover:text-orange-400">Privacidad</a>
            <a href="#" className="hover:text-orange-400">Legales</a>
          </div>
          <p className="text-center">© {new Date().getFullYear()} Autoservice Liam Yahir. Hecho por <a className="text-orange-400" href="https://tinuxsoluciones.online" target="_blank" rel="noreferrer">TinuX solucioneS</a></p>
        </div>
      </div>

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
