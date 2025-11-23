import React from 'react'
import { ArrowRightCircle, Bike, Salad, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'LiamYA ir Delivery',
    description: 'Pedidos veloces, seguimiento y pago como quieras. Servicio estrella 24/7.',
    icon: <Bike className="w-14 h-14" />,
    to: '/delivery',
    color: 'from-orange-500 to-red-600',
  },
  {
    title: 'Rotisería',
    description: 'Platos caseros, pastas, milanesas y menús diarios listos para llevar.',
    icon: <Flame className="w-14 h-14" />,
    to: '/categorias',
    color: 'from-amber-400 to-orange-600',
  },
  {
    title: 'Frutas & Verduras',
    description: 'Productos frescos y de estación con combos saludables para tu semana.',
    icon: <Salad className="w-14 h-14" />,
    to: '/productos',
    color: 'from-green-400 to-lime-500',
  },
]

export default function Home() {
  return (
    <div className="pt-48 pb-16 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <section className="bg-black/60 rounded-3xl border border-orange-500/60 p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="uppercase text-orange-400 font-bold mb-2">Autoservice Liam Yahir</p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">Supermercado, almacén, kiosko, rotisería y delivery en un solo lugar.</h1>
              <p className="text-lg text-zinc-200 max-w-2xl">Bienvenido a "LiamYA ir", el servicio de envíos que acompaña tus compras. Elegí tus productos favoritos y recibilos en minutos.</p>
              <div className="flex gap-4 mt-6">
                <Link to="/delivery" className="bg-orange-500 text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2">Probar delivery <ArrowRightCircle /></Link>
                <Link to="/register" className="bg-white/10 text-white border border-orange-500 px-6 py-3 rounded-2xl">Registrarme</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item.title} className={`rounded-2xl p-4 bg-gradient-to-br ${item.color} text-black font-black shadow-xl`}>{item.title}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 text-black shadow-xl hover:scale-105 transition`}
            >
              <div className="flex justify-between items-start">
                <div className="bg-black/20 text-white rounded-2xl p-3">{item.icon}</div>
                <ArrowRightCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mt-4">{item.title}</h3>
              <p className="text-sm mt-2 text-black/90 font-semibold">{item.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}
