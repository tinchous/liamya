import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './index.css'

// Silenciamos los warnings de futuro de React Router (no rompen nada)
const consoleWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Future Flag Warning')) return
  consoleWarn(...args)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
