import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminPanel() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resumen, setResumen] = useState({ ventas_dia: 0, pedidos_dia: 0, delivery_dia: 0 })
  const [ventas, setVentas] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [productos, setProductos] = useState([])

  const permisos = useMemo(() => {
    if (!user) return []
    switch ((user.rol || '').toUpperCase()) {
      case 'ADMINISTRADOR':
        return ['ABM de pedidos', 'ABM de productos', 'ABM de usuarios', 'ABM de empleados', 'Reportes completos']
      case 'SUPERVISOR':
        return ['ABM de pedidos', 'ABM de productos', 'ABM de empleados']
      default:
        return ['Modificar pedidos', 'Modificar productos']
    }
  }, [user])

  useEffect(() => {
    if (!user || !['ADMINISTRADOR', 'SUPERVISOR', 'EMPLEADO'].includes((user.rol || '').toUpperCase())) {
      navigate('/login')
      return
    }
    const cargar = async () => {
      const [r1, r2, r3, r4] = await Promise.all([
        fetch('http://localhost:5000/api/dashboard').then((r) => r.json()),
        fetch('http://localhost:5000/api/dashboard/ventas_mensuales').then((r) => r.json()),
        fetch('http://localhost:5000/api/pedidos').then((r) => r.json()),
        fetch('http://localhost:5000/api/products').then((r) => r.json()),
      ])
      setResumen(r1)
      setVentas(r2)
      setPedidos(r3)
      setProductos(r4)
    }
    cargar()
  }, [user, navigate])

  const cards = [
    { label: 'Ventas del día', value: `$${resumen.ventas_dia}`, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Cantidad de pedidos', value: pedidos.length || resumen.pedidos_dia, color: 'from-sky-400 to-blue-600' },
    { label: 'Total $ de Delivery', value: `$${resumen.delivery_dia}`, color: 'from-orange-400 to-red-500' },
  ]

  return (
    <div className="pt-48 pb-16 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-black/60 border border-orange-500/60 rounded-3xl p-8 flex justify-between items-center">
          <div>
            <p className="text-orange-400 uppercase text-xs font-bold">Panel Administrativo</p>
            <h1 className="text-4xl font-black text-white">Hola {user?.nombre || 'equipo'}</h1>
            <p className="text-sm text-zinc-300">Acceso: {user?.rol}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-200 text-sm">Permisos activos</p>
            <ul className="text-orange-300 text-sm font-semibold">
              {permisos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.label} className={`bg-gradient-to-br ${c.color} text-black rounded-3xl p-6 shadow-xl`}> 
              <p className="text-sm font-bold uppercase">{c.label}</p>
              <p className="text-3xl font-black">{c.value}</p>
            </div>
          ))}
        </div>

        <section className="bg-black/60 border border-orange-500/60 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-white mb-4">Ventas del mes (barras)</h2>
          <div className="flex gap-2 items-end h-64">
            {ventas.map((v) => (
              <div key={v.dia} className="flex flex-col items-center flex-1">
                <div className="bg-orange-500 w-full rounded-t-xl" style={{ height: Math.min(v.ventas / 10, 240) + 'px' }}></div>
                <p className="text-white text-xs mt-1">{v.dia}</p>
              </div>
            ))}
            {ventas.length === 0 && <p className="text-zinc-300">Sin datos de ventas.</p>}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/60 border border-orange-500/60 rounded-3xl p-6">
            <h3 className="text-xl font-black text-white mb-2">ABM Pedidos (lectura)</h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-2 text-sm text-zinc-200">
              {pedidos.map((p) => (
                <li key={p.numero} className="border border-orange-500/30 rounded-2xl p-3">
                  <div className="flex justify-between">
                    <span>{p.numero}</span>
                    <span>{p.fecha}</span>
                  </div>
                  <p className="text-orange-300">${p.total}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/60 border border-orange-500/60 rounded-3xl p-6">
            <h3 className="text-xl font-black text-white mb-2">ABM Productos (lectura)</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white max-h-72 overflow-y-auto pr-2">
              {productos.map((p) => (
                <li key={p.id} className="border border-orange-500/30 rounded-2xl p-3">
                  <p className="font-bold">{p.nombre}</p>
                  <p className="text-orange-300">${p.precio}</p>
                  <p className="text-xs text-zinc-300">{p.categoria}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
