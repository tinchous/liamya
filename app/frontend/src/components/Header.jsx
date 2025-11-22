import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  let totalItems = 0;
  try {
    const { cart } = useCart();
    totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  } catch (e) {}

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 shadow-2xl">
      <div className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <img src="/logo-header.png" alt="Autoservice Liam Yahir" className="h-24 md:h-32" />
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white">AUTO SERVICE</h1>
              <h2 className="text-2xl md:text-4xl text-yellow-300">LIAM YAHIR</h2>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <ShoppingCart className="w-20 h-20 md:w-24 md:h-24 text-white" />
              <span className="absolute -top-4 -right-4 bg-orange-500 text-black text-3xl font-bold rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl">
                {totalItems}
              </span>
            </div>
            <a href="/login" className="bg-black text-orange-500 px-8 py-4 rounded-2xl text-2xl font-bold hover:bg-gray-900 transition flex items-center gap-3">
              <User className="w-8 h-8" />
              Ingresar / Registrarse
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-gray-900 border-t-8 border-b-8 border-orange-500 py-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-12 md:gap-20 text-2xl md:text-3xl font-bold">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500 border-b-4 border-orange-500 pb-2" : "text-white hover:text-orange-500 transition"}>INICIO</NavLink>
          <NavLink to="/productos" className={({ isActive }) => isActive ? "text-orange-500 border-b-4 border-orange-500 pb-2" : "text-white hover:text-orange-500 transition"}>PRODUCTOS</NavLink>
          <NavLink to="/nosotros" className={({ isActive }) => isActive ? "text-orange-500 border-b-4 border-orange-500 pb-2" : "text-white hover:text-orange-500 transition"}>NOSOTROS</NavLink>
          <NavLink to="/delivery" className={({ isActive }) => isActive ? "text-orange-500 border-b-4 border-orange-500 pb-2" : "text-white hover:text-orange-500 transition"}>DELIVERY</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "text-orange-500 border-b-4 border-orange-500 pb-2" : "text-white hover:text-orange-500 transition"}>CONTACTO</NavLink>
        </div>
      </nav>
    </header>
  );
}
