import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Delivery from './pages/Delivery'
import Contacto from './pages/Contacto'
import Categorias from './pages/Categorias'
import AdminPanel from './pages/AdminPanel'
import Footer from './components/Footer'
import FloatingCart from './components/FloatingCart'   // ← NUEVO

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      
      {/* ← CARRITO FLOTANTE GLOBAL EN TODAS LAS PÁGINAS */}
      <FloatingCart />
    </div>
  )
}
