import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* HEADER PRINCIPAL - COLORES REALES DEL LOCAL */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-8 border-orange-500">
        <div className="bg-gradient-to-r from-red-800 via-black to-red-800 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
            <div className="flex items-center gap-6">
              <div className="bg-white p-2 rounded-2xl shadow-2xl">
                <div className="bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center"><span className="text-6xl md:text-8xl font-black text-orange-600 neon-text">LY</span></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-orange-500 drop-shadow-2xl neon-text">AUTO SERVICE</h1>
                <h2 className="menu-item lg:text-5xl font-black text-white">LIAM YAHIR</h2>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative">
                <ShoppingCart className="w-20 h-20 text-orange-500 drop-shadow-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-4 -right-4 bg-red-600 text-white text-3xl font-black rounded-full w-16 h-16 flex items-center justify-center shadow-2xl border-4 border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <a href="/login" className="bg-orange-600 hover:bg-orange-500 text-black font-black px-8 py-5 rounded-2xl text-2xl flex items-center gap-3 border-4 border-white shadow-2xl">
                <User className="w-10 h-10" />
                INGRESAR
              </a>
            </div>
          </div>
        </div>

        {/* MENÚ CON CATEGORÍAS PRIMERO - ORDEN EXACTO */}
        <nav className="bg-black border-t-8 border-b-8 border-orange-500">
          <div className="max-w-7xl mx-auto flex justify-center gap-8 md:gap-16 py-6 menu-item font-black">
            <NavLink to="/categorias" className={({ isActive }) => isActive ? "text-orange-500 border-b-8 border-orange-500 pb-3" : "text-white hover:text-orange-500 transition"}>CATEGORÍAS</NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500 border-b-8 border-orange-500 pb-3" : "text-white hover:text-orange-500 transition"}>INICIO</NavLink>
            <NavLink to="/productos" className={({ isActive }) => isActive ? "text-orange-500 border-b-8 border-orange-500 pb-3" : "text-white hover:text-orange-500 transition"}>PRODUCTOS</NavLink>
            <NavLink to="/nosotros" className={({ isActive }) => isActive ? "text-orange-500 border-b-8 border-orange-500 pb-3" : "text-white hover:text-orange-500 transition"}>SOBRE NOSOTROS</NavLink>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? "text-orange-500 border-b-8 border-orange-500 pb-3" : "text-white hover:text-orange-500 transition"}>CONTACTO</NavLink>
          </div>
        </nav>
      </header>
    </>
  )
}
