import React from 'react'

export default function Nosotros() {
  return (
    <div className="pt-64 pb-32 px-8 text-center">
      <h1 className="text-7xl md:text-9xl font-black text-orange-500 mb-20 neon-text">
        SOBRE NOSOTROS
      </h1>
      <div className="max-w-4xl mx-auto space-y-12">
        <p className="text-4xl md:text-6xl font-bold text-yellow-400">
          Auto Service Liam Yahir • Desde 2018 en la esquina
        </p>
        <p className="text-3xl md:text-5xl text-white leading-relaxed">
          El neón que nunca se apagó. El lugar donde Montevideo se junta a cualquier hora.
          <br /><br />
          24 horas prendidos, 365 días al año.
          <br />
          Delivery hasta las 23:30, pero el corazón nunca cierra.
        </p>
        <div className="text-6xl mt-20">
          <span className="text-red-600 font-black">❤️</span>
          <span className="text-orange-500 font-black"> LIAM YAHIR </span>
          <span className="text-red-600 font-black">❤️</span>
        </div>
      </div>
    </div>
  )
}
