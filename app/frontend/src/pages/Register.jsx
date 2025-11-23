import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="pt-48 pb-16 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 min-h-screen">
      <div className="max-w-5xl mx-auto bg-zinc-900/70 border border-orange-500/60 rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black text-orange-400 mb-8 text-center">Registrate y pedí más rápido</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Nombre y Apellido</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-4 rounded-2xl bg-black/60 border border-orange-500 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Teléfono</label>
            <input
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="w-full p-4 rounded-2xl bg-black/60 border border-orange-500 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-2xl bg-black/60 border border-orange-500 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-4 rounded-2xl bg-black/60 border border-orange-500 text-white"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-lg font-semibold mb-2">Dirección</label>
            <input
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              className="w-full p-4 rounded-2xl bg-black/60 border border-orange-500 text-white"
            />
          </div>
          {error && <p className="text-red-400 md:col-span-2">{error}</p>}
          <button
            type="submit"
            className="md:col-span-2 bg-orange-500 hover:bg-orange-400 text-black font-black py-4 rounded-2xl text-xl"
          >
            Crear cuenta
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-zinc-200">
          ¿Ya tenés usuario?{' '}
          <Link to="/login" className="text-orange-400 font-bold">Ingresá</Link>
        </p>
      </div>
    </div>
  )
}
