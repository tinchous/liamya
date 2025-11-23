import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout, setUser } = useAuth()
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    setPerfil(user)
    const cargar = async () => {
      const res = await fetch(`http://localhost:5000/api/pedidos?email=${user.email}`)
      const data = await res.json()
      setPedidos(data)
    }
    cargar()
  }, [user, navigate])

  if (!user || !perfil) return null

  const guardarPerfil = async (e) => {
    e.preventDefault()
    setMensaje('')
    const res = await fetch(`http://localhost:5000/api/usuarios/${perfil.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(perfil),
    })
    const data = await res.json()
    if (res.ok) {
      setMensaje('Datos actualizados')
      setUser(data.usuario)
    }
  }

  const repetirPedido = async (numero) => {
    const res = await fetch(`http://localhost:5000/api/pedidos/${numero}/repetir`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setPedidos((prev) => [data.pedido, ...prev])
      setMensaje(`Pedido ${data.numero} generado nuevamente`)
    }
  }

  return (
    <div className="pt-48 pb-16 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/70 border border-orange-500/60 rounded-3xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-5xl font-black text-orange-400">Hola {perfil.nombre || 'cliente'}</h1>
            <button onClick={() => { logout(); navigate('/') }} className="text-sm bg-red-500 px-4 py-2 rounded-xl text-black font-bold">Salir</button>
          </div>
          <form onSubmit={guardarPerfil} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={perfil.nombre}
              onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
              className="p-3 rounded-xl bg-black/60 border border-orange-500 text-white"
              placeholder="Nombre"
            />
            <input
              value={perfil.telefono}
              onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
              className="p-3 rounded-xl bg-black/60 border border-orange-500 text-white"
              placeholder="Teléfono"
            />
            <input
              value={perfil.email}
              readOnly
              className="p-3 rounded-xl bg-black/40 border border-orange-500 text-white opacity-70"
            />
            <input
              value={perfil.direccion}
              onChange={(e) => setPerfil({ ...perfil, direccion: e.target.value })}
              className="p-3 rounded-xl bg-black/60 border border-orange-500 text-white"
              placeholder="Dirección"
            />
            <button type="submit" className="md:col-span-2 bg-orange-500 hover:bg-orange-400 text-black font-black py-3 rounded-xl">
              Guardar cambios
            </button>
            {mensaje && <p className="md:col-span-2 text-green-400 font-semibold">{mensaje}</p>}
          </form>
        </div>

        <div className="bg-zinc-900/70 border border-orange-500/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-black text-orange-300 mb-4">Historial de pedidos</h2>
          {pedidos.length === 0 && <p className="text-zinc-300 text-sm">Todavía no realizaste pedidos.</p>}
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
            {pedidos.map((p) => (
              <div key={p.numero} className="bg-black/50 border border-orange-500/30 rounded-2xl p-3">
                <div className="flex justify-between text-sm text-zinc-300">
                  <span>{p.numero}</span>
                  <span>{p.fecha}</span>
                </div>
                <p className="text-lg font-bold text-white mt-1">${p.total}</p>
                <button
                  onClick={() => repetirPedido(p.numero)}
                  className="mt-2 text-sm bg-orange-500 text-black font-bold px-3 py-1 rounded-xl"
                >
                  Repetir pedido
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
