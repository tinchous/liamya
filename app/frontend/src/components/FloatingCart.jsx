import React, { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Send } from 'lucide-react'
import { useCart } from '../context/CartContext'
import confetti from 'canvas-confetti'

export default function FloatingCart() {
  const { cart, setCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', address: '', payment: 'efectivo', note: '' })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = total >= 1499 ? 0 : 50
  const totalWithDelivery = total + delivery

  const handleFly = (e) => {
    const button = e.currentTarget
    const cartIcon = document.querySelector('#floating-cart')
    const rect = button.getBoundingClientRect()
    const cartRect = cartIcon.getBoundingClientRect()

    const flying = button.cloneNode(true)
    flying.style.position = 'fixed'
    flying.style.zIndex = '9999'
    flying.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
    flying.style.left = rect.left + 'px'
    flying.style.top = rect.top + 'px'
    flying.style.transform = 'scale(1.5) rotate(20deg)'
    document.body.appendChild(flying)

    setTimeout(() => {
      flying.style.left = cartRect.left + 'px'
      flying.style.top = cartRect.top + 'px'
      flying.style.transform = 'scale(0.5) rotate(360deg)'
    }, 100)

    setTimeout(() => {
      document.body.removeChild(flying)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }, 1100)
  }

  const sendWhatsApp = () => {
    let message = `*¡NUEVO PEDIDO DE LIAM YAHIR!* 🔥%0A%0A`
    message += `*Cliente:* ${formData.name}%0A`
    message += `*Dirección:* ${formData.address}%0A`
    message += `*Pago:* ${formData.payment.toUpperCase()}%0A%0A`
    message += `*Productos:*%0A`
    cart.forEach(p => message += `• ${p.quantity}x ${p.name} - $${p.price * p.quantity}%0A`)
    message += `%0A*Subtotal:* $${total}%0A`
    message += `*Delivery:* ${delivery === 0 ? 'GRATIS 🎉' : '$50'}%0A`
    message += `*TOTAL:* $${totalWithDelivery}%0A%0A`
    if (formData.note) message += `*Nota:* ${formData.note}%0A%0A`
    message += `TINU X SOLUCIONES © 2025 - EL NEÓN NUNCA MUERE`

    window.open(`https://wa.me/59892308828?text=${message}`, '_blank')
    confetti({ particleCount: 300, spread: 100, origin: { y: 0.4 } })
  }

  return (
    <>
      <button
        id="floating-cart"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-full shadow-2xl hover:scale-110 transition z-50 border-4 border-white neon-text"
      >
        <ShoppingCart className="w-16 h-16 text-white" />
        {cart.length > 0 && (
          <span className="absolute -top-4 -right-4 bg-yellow-400 text-black text-3xl font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-2xl">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
          <div className="bg-gray-900 border-8 border-orange-500 rounded-3xl p-10 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-6xl font-black text-orange-500">TU PEDIDO</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-500">
                <X className="w-12 h-12" />
              </button>
            </div>

            {/* LISTA PRODUCTOS */}
            {cart.map((item, i) => (
              <div key={i} className="bg-black border-4 border-orange-500 rounded-2xl p-6 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                  <p className="text-2xl text-orange-400">${item.price} c/u</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setCart(cart.map((c, idx) => idx === i ? { ...c, quantity: c.quantity - 1 } : c).filter(c => c.quantity > 0))}
                    className="bg-red-600 p-3 rounded-full"><Minus /></button>
                  <span className="text-4xl font-black text-yellow-400">{item.quantity}</span>
                  <button onClick={() => setCart(cart.map((c, idx) => idx === i ? { ...c, quantity: c.quantity + 1 } : c))}
                    className="bg-green-600 p-3 rounded-full"><Plus /></button>
                </div>
              </div>
            ))}

            <div className="mt-8 text-4xl font-black text-right">
              <p>Subtotal: ${total}</p>
              <p>Delivery: {delivery === 0 ? 'GRATIS 🎉' : '$50'}</p>
              <p className="text-6xl text-orange-500">TOTAL: ${totalWithDelivery}</p>
            </div>

            {/* FORMULARIO */}
            <div className="mt-8 space-y-6">
              <input placeholder="Nombre o Apodo" className="w-full p-6 text-3xl bg-black border-4 border-orange-500 rounded-2xl text-white" 
                onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input placeholder="Domicilio completo" className="w-full p-6 text-3xl bg-black border-4 border-orange-500 rounded-2xl text-white"
                onChange={e => setFormData({ ...formData, address: e.target.value })} />
              <select className="w-full p-6 text-3xl bg-black border-4 border-orange-500 rounded-2xl text-white"
                onChange={e => setFormData({ ...formData, payment: e.target.value })}>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta al entregar</option>
              </select>
              <textarea placeholder="Nota (opcional)" rows="3" className="w-full p-6 text-3xl bg-black border-4 border-orange-500 rounded-2xl text-white"
                onChange={e => setFormData({ ...formData, note: e.target.value })} />
            </div>

            <button onClick={sendWhatsApp} className="mt-10 w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-5xl font-black py-8 rounded-3xl hover:scale-105 transition flex items-center justify-center gap-6">
              <Send className="w-16 h-16" />
              ENVIAR PEDIDO POR WHATSAPP
            </button>
          </div>
        </div>
      )}
    </>
  )
}
