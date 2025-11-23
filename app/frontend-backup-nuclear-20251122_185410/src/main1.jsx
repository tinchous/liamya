import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { DeliveryProvider } from './context/DeliveryContext'  // <-- IMPORTANTE
import Home from './pages/index.jsx'
import Productos from './pages/productos.jsx'
import Nosotros from './pages/nosotros.jsx'
import Contacto from './pages/contacto.jsx'
import Delivery from './pages/delivery.jsx'
import AdminPanel from './pages/admin/index.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <DeliveryProvider>   {/* <-- TAMBIÉN IMPORTANTE */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </DeliveryProvider>
    </CartProvider>
  </React.StrictMode>
)
