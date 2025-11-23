import React from 'react'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import confetti from 'canvas-confetti'

const productos = [
  { id: 1, name: "Zillertal 1L", price: 380, cat: "Cervezas" },
  { id: 2, name: "Patricia 1L", price: 320, cat: "Cervezas" },
  { id: 3, name: "Coca Cola 2.25L", price: 380, cat: "Gaseosas" },
  { id: 4, name: "Fanta 2.25L", price: 360, cat: "Gaseosas" },
  { id: 5, name: "Hamburguesa Completa", price: 450, cat: "Rotisería" },
  { id: 6, name: "Chivito Canadiense", price: 750, cat: "Rotisería" },
  { id: 7, name: "Pizza Muzzarella Grande", price: 890, cat: "Rotisería" },
  { id: 8, name: "Papas Cheddar Bacon", price: 680, cat: "Rotisería" },
  { id: 9, name: "Fernet Branca 750ml", price: 1850, cat: "Bebidas" },
  { id: 10, name: "Smirnoff 1L", price: 1490, cat: "Bebidas" },
]

export default function Productos() {
  const { setCart } = useCart()

  const addToCart = (producto) => {
    setCart(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...producto, quantity: 1 }]
    })

    // EFECTO FLY HACIA EL CARRITO
    const button = event.currentTarget
    const cartIcon = document.querySelector('#floating-cart')
    const flying = button.querySelector('.fly-icon').cloneNode(true)
    flying.style.position = 'fixed'
    flying.style.zIndex = '9999'
    flying.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
    const rect = button.getBoundingClientRect()
    flying.style.left = rect.left + rect.width / 2 - 30 + 'px'
    flying.style.top = rect.top + 'px'
    document.body.appendChild(flying)

    setTimeout(() => {
      const cartRect = cartIcon.getBoundingClientRect()
      flying.style.left = cartRect.left + 40 + 'px'
      flying.style.top = cartRect.top + 40 + 'px'
      flying.style.transform = 'scale(0.3) rotate(360deg)'
    }, 100)

    setTimeout(() => {
      document.body.removeChild(flying)
      confetti({ particleCount: 80, spread: 70, origin: { x: 1, y: 1 } })
    }, 1100)
  }

  return (
    <div className="pt-56 pb-32 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-orange-500 text-center mb-16 animate-pulse">
          PRODUCTOS
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {productos.map(p => (
            <div key={p.id} className="bg-gray-900 border-8 border-orange-500 rounded-3xl overflow-hidden hover:border-red-600 transition transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-orange-600 to-red-700 h-48 flex items-center justify-center">
                <span className="text-6xl font-black text-white opacity-30">{p.cat}</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-3xl font-black text-white mb-2">{p.name}</h3>
                <p className="text-5xl font-black text-yellow-400 mb-6">${p.price}</p>
                <button
                  onClick={addToCart.bind(null, p)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-6 rounded-2xl font-black text-3xl hover:scale-110 transition flex items-center justify-center gap-4"
                >
                  <Plus className="w-12 h-12 fly-icon" />
                  AGREGAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
