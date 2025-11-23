import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="pt-48 pb-16 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-zinc-900/70 border border-orange-500/60 rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black text-orange-400 mb-8 text-center">Ingresar a LiamYA ir</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          {error && <p className="text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-4 rounded-2xl text-xl"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-zinc-200">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="text-orange-400 font-bold">Registrate</Link>
        </p>
        <p className="text-center text-xs mt-2 text-zinc-500">Admin: admin@liamya.local / admin</p>
      </div>
    </div>
  )
}
