import React from 'react'

export default function Delivery() {
  return (
    <div className="pt-64 pb-32 px-8 text-center">
      <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-16 neon-text">
        DELIVERY 08:00 - 23:30
      </h1>
      <div className="max-w-4xl mx-auto space-y-12 text-5xl md:text-7xl font-black">
        <p className="text-yellow-400">
          $50 hasta compras de $1499
        </p>
        <p className="text-green-500 animate-pulse">
          GRATIS desde $1499 🎉
        </p>
        <p className="text-white">
          Pedidos por WhatsApp al
        </p>
        <a href="https://wa.me/59892308828" className="inline-block bg-green-600 px-12 py-8 rounded-3xl hover:scale-110 transition">
          <span className="text-white">+598 92 308 828</span>
        </a>
      </div>
    </div>
  )
}
