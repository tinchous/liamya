// components/Header.jsx - VERSIÓN CORREGIDA
import { Link, useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b-2 border-neonOrange rounded-b-3xl shadow-[0_0_25px_#ff8c00]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo-header.png"
              alt="Autoservice Liam Yahir"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-lg font-bold text-neonOrange">AUTOSERVICE</h1>
              <p className="text-xs text-white">LIAM - YAHIR</p>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium ${
              location.pathname === '/' ? 'bg-neonOrange text-black' : 'text-white hover:bg-gray-800'
            }`}>
              Inicio
            </Link>
            <Link to="/productos" className={`px-3 py-2 rounded-lg text-sm font-medium ${
              location.pathname === '/productos' ? 'bg-neonOrange text-black' : 'text-white hover:bg-gray-800'
            }`}>
              Productos
            </Link>
            {/* ... más links ... */}
          </nav>

          <AudioPlayer />
        </div>
      </div>
    </header>
  );
}
