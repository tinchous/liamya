import { useState, useEffect } from "react";
import { getUsuarioActual, login, logout } from "../../lib/auth";
import PedidosTable from "../../components/PedidosTable";
import ProductosAdmin from "../../components/ProductosAdmin";
import UsuariosAdmin from "../../components/UsuariosAdmin";

const menuItems = [
  { id: "pedidos", label: "Pedidos", icon: "🛒", roles: ["ADMINISTRADOR", "SUPERVISOR", "EMPLEADO_ALTAS"] },
  { id: "productos", label: "Productos", icon: "📦", roles: ["ADMINISTRADOR", "SUPERVISOR"] },
  { id: "usuarios", label: "Usuarios", icon: "👥", roles: ["ADMINISTRADOR"] },
  { id: "reportes", label: "Reportes", icon: "📊", roles: ["ADMINISTRADOR", "SUPERVISOR"] }
];

export default function AdminPanel() {
  const [usuario, setUsuario] = useState(getUsuarioActual());
  const [mostrarLogin, setMostrarLogin] = useState(!getUsuarioActual());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seccion, setSeccion] = useState("pedidos");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      setUsuario(user);
      setMostrarLogin(false);
      setEmail("");
      setPassword("");
    } else {
      alert("Email o contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    logout();
    setUsuario(null);
    setMostrarLogin(true);
  };

  // LOGIN SCREEN (solo cuando no hay usuario o se pide cambiar)
  if (!usuario || mostrarLogin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-orange-900 to-black p-20 rounded-3xl border-8 border-orange-500 shadow-2xl shadow-orange-500/80">
          <h1 className="text-9xl font-black text-orange-500 mb-16 text-center drop-shadow-2xl">
            ADMIN PANEL
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-10">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-10 text-4xl bg-black border-8 border-orange-500 rounded-3xl text-white text-center placeholder-orange-700"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-10 text-4xl bg-black border-8 border-orange-500 rounded-3xl text-white text-center"
              required
            />
            <button type="submit" className="w-full bg-orange-500 text-black font-black text-6xl py-10 rounded-3xl hover:bg-orange-400 transition shadow-2xl">
              INGRESAR
            </button>
          </form>

          <div className="mt-16 text-center space-y-6">
            <p className="text-4xl text-orange-300 font-bold">Credenciales de prueba:</p>
            <div className="text-2xl text-gray-300 space-y-3">
              <p>👑 tino@liamyahir.com → Administrador</p>
              <p>👀 ana@liamyahir.com → Supervisor</p>
              <p>👷 juan@liamyahir.com → Empleado</p>
              <p className="text-orange-500 text-3xl mt-6">Todas con contraseña: 1234</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="/" className="inline-block bg-gray-900 text-orange-500 px-12 py-6 rounded-2xl text-3xl font-bold hover:bg-gray-800 transition">
              ← Volver al sitio público
            </a>
          </div>
        </div>
      </div>
    );
  }

  const itemsVisibles = menuItems.filter(item => item.roles.includes(usuario.rol));

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-80 bg-gradient-to-b from-orange-900 to-black border-r-8 border-orange-500 p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-orange-500 drop-shadow-2xl">ADMIN PANEL</h1>
          <p className="text-2xl text-orange-300 mt-4">Liam & Yahir</p>
        </div>

        <div className="bg-black/50 rounded-3xl p-6 border-4 border-orange-600 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-3xl font-bold text-orange-400">{usuario.nombre}</p>
            <p className="text-xl text-orange-300">{usuario.rol.replace("_", " ")}</p>
          </div>
        </div>

        <nav className="space-y-4">
          {itemsVisibles.map(item => (
            <button
              key={item.id}
              onClick={() => setSeccion(item.id)}
              className={`w-full text-left p-6 rounded-2xl text-2xl font-bold transition-all flex items-center gap-4
                ${seccion === item.id 
                  ? "bg-orange-500 text-black shadow-2xl shadow-orange-500/80" 
                  : "bg-gray-900 text-orange-400 hover:bg-orange-600 hover:text-black border-4 border-orange-700"
                }`}
            >
              <span className="text-4xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-12 space-y-4">
          <button 
            onClick={() => setMostrarLogin(true)}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-2xl py-6 rounded-2xl transition"
          >
            🔄 Cambiar Usuario
          </button>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-2xl py-6 rounded-2xl transition"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-12">
        <div className="max-w-7xl mx-auto">
          {seccion === "pedidos" && <PedidosTable usuario={usuario} />}
          {seccion === "productos" && <ProductosAdmin />}
          {seccion === "usuarios" && <UsuariosAdmin />}
          {seccion === "reportes" && (
            <div className="text-center py-32">
              <h2 className="text-8xl font-black text-orange-500 mb-8">REPORTES</h2>
              <p className="text-4xl text-gray-400">Próximamente...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
