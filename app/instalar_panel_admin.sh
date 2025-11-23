#!/bin/bash
# ======================================================
#  Script: instalar_panel_admin.sh
#  Autor: Tino & Onit
#  Función: Generar la estructura completa del panel admin
# ======================================================

BASE_DIR="frontend/src"
ADMIN_DIR="$BASE_DIR/admin"
PAGES_DIR="$BASE_DIR/pages"
mkdir -p "$ADMIN_DIR" "$PAGES_DIR"

# ===============================
# AdminLayout.jsx
# ===============================
cat > "$ADMIN_DIR/AdminLayout.jsx" <<'EOF'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) navigate("/admin/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-black/80 border-r border-orange-500 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 text-orange-400 border-b border-orange-600">
          Panel Admin
        </h2>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block hover:text-orange-400">🏠 Dashboard</Link>
          <Link to="/admin/productos" className="block hover:text-orange-400">🧾 Productos</Link>
          <Link to="/admin/usuarios" className="block hover:text-orange-400">👥 Usuarios</Link>
          <Link to="/admin/reportes" className="block hover:text-orange-400">📊 Reportes</Link>
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            navigate("/admin/login");
          }}
          className="m-4 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 bg-gray-950 text-white p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
EOF

# ===============================
# Login.jsx
# ===============================
cat > "$PAGES_DIR/Login.jsx" <<'EOF'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-2xl shadow-[0_0_20px_#ff8c00] border border-orange-500"
      >
        <h1 className="text-3xl mb-6 text-orange-400 font-bold text-center">
          Login Admin
        </h1>
        <input
          type="text"
          placeholder="Usuario"
          className="block w-64 mb-3 p-2 bg-black border border-gray-700 rounded"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="block w-64 mb-6 p-2 bg-black border border-gray-700 rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-black font-bold py-2 rounded hover:bg-orange-400"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
EOF

# ===============================
# Dashboard.jsx
# ===============================
cat > "$ADMIN_DIR/Dashboard.jsx" <<'EOF'
export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl text-orange-400 font-bold mb-6">Panel General</h1>
      <p>Bienvenido al panel administrativo de <strong>Autoservice Liam Yahir</strong>.</p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl border border-orange-500 text-center">
          <h2 className="text-lg text-orange-400">Productos</h2>
          <p className="text-2xl font-bold">📦</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-orange-500 text-center">
          <h2 className="text-lg text-orange-400">Usuarios</h2>
          <p className="text-2xl font-bold">👥</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-orange-500 text-center">
          <h2 className="text-lg text-orange-400">Pedidos</h2>
          <p className="text-2xl font-bold">🧾</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-orange-500 text-center">
          <h2 className="text-lg text-orange-400">Delivery</h2>
          <p className="text-2xl font-bold">🛵</p>
        </div>
      </div>
    </div>
  );
}
EOF

# ===============================
# UsuariosAdmin.jsx
# ===============================
cat > "$ADMIN_DIR/UsuariosAdmin.jsx" <<'EOF'
import { useState } from "react";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Administrador", rol: "Admin" },
    { id: 2, nombre: "Vendedor 1", rol: "Operador" },
  ]);

  return (
    <div>
      <h1 className="text-3xl text-orange-400 font-bold mb-6">Gestión de Usuarios</h1>
      <table className="w-full border border-orange-500">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border-b border-orange-500">ID</th>
            <th className="p-2 border-b border-orange-500">Nombre</th>
            <th className="p-2 border-b border-orange-500">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="text-center border-b border-gray-700">
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
EOF

# ===============================
# Reportes.jsx
# ===============================
cat > "$ADMIN_DIR/Reportes.jsx" <<'EOF'
export default function Reportes() {
  return (
    <div>
      <h1 className="text-3xl text-orange-400 font-bold mb-6">Reportes</h1>
      <p>Aquí podrás filtrar ventas por rango de fechas, categorías y delivery.</p>
      <div className="mt-6 bg-gray-800 p-6 rounded-xl border border-orange-500 text-center">
        <p className="text-gray-400">📈 En construcción...</p>
      </div>
    </div>
  );
}
EOF

# ===============================
# ProductosAdmin.jsx (con buscador)
# ===============================
cat > "$ADMIN_DIR/ProductosAdmin.jsx" <<'EOF'
import { useState, useEffect } from "react";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((r) => r.json())
      .then((data) => setProductos(data))
      .catch((e) => console.error("Error cargando productos:", e));
  }, []);

  const guardar = () => {
    fetch("http://127.0.0.1:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    }).then(() => {
      alert("✅ Producto guardado");
      setNuevo({});
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-orange-400 font-bold mb-6">Gestión de Productos</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="p-2 rounded bg-black/70 border border-orange-500 text-white"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="w-full border border-orange-500">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border-b border-orange-500">#</th>
            <th className="p-2 border-b border-orange-500">Nombre</th>
            <th className="p-2 border-b border-orange-500">Precio</th>
            <th className="p-2 border-b border-orange-500">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .filter(p =>
              p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
              p.categoria.toLowerCase().includes(busqueda.toLowerCase())
            )
            .map((p, i) => (
              <tr key={i} className="text-center border-b border-gray-700">
                <td>{i + 1}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.categoria}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
EOF

echo "✅ Panel administrativo generado con éxito."
