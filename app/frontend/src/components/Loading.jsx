import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-black text-orange-500 animate-pulse neon-text">
          CARGANDO EL NEÓN
        </h1>
        <p className="text-4xl text-yellow-400 mt-8">24HS • NUNCA MUERE</p>
      </div>
    </div>
  )
}
