import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Layout principal del panel administrativo
 * - Protege rutas si no hay token
 * - Menú lateral animado con estilo neón
 * - Integra todas las secciones del backend: Dashboard, Productos, Usuarios, Reportes
 */
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================
  // 🔒 Protección de ruta
  // ==========================
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  // ==========================
  // 🚪 Cerrar sesión
  // ==========================
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ==========================
  // 🎨 Estilos visuales y JSX
  // ==========================
  const links = [
    { to: "/admin/dashboard", label: "📊 Dashboard" },
    { to: "/admin/productos", label: "🛒 Productos" },
    { to: "/admin/usuarios", label: "👥 Usuarios" },
    { to: "/admin/reportes", label: "📈 Reportes" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* ===================================================== */}
      {/* 📁 SIDEBAR */}
      {/* ===================================================== */}
      <aside className="w-64 bg-black/80 border-r border-neonOrange flex flex-col shadow-[0_0_15px_#ff8c00]">
        {/* Logo y título */}
        <div className="text-center py-6 font-display text-2xl text-neonOrange border-b border-gray-700">
          🧩 Panel Administrativo
        </div>

        {/* Navegación */}
        <nav className="flex-1 flex flex-col p-4 gap-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg transition text-sm font-semibold
                ${
                  location.pathname === link.to
                    ? "bg-neonOrange text-black"
                    : "hover:text-neonOrange"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botón de cierre */}
        <button
          onClick={logout}
          className="m-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-bold shadow-[0_0_10px_#ff8c00]"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* ===================================================== */}
      {/* 📋 CONTENIDO PRINCIPAL */}
      {/* ===================================================== */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
