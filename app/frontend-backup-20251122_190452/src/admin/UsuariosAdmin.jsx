import { useState, useEffect } from "react";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    telefono: "",
    email: "",
    domicilio: "",
    metodo_pago: "EFECTIVO",
    rol: "Usuario Invitado",
    password: "",
  });

  // Cargar usuarios al montar
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const agregarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password) {
      alert("Complete los campos obligatorios: nombre, email y contraseña.");
      return;
    }

    fetch("http://127.0.0.1:5000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Usuario agregado correctamente.");
        setUsuarios([...usuarios, nuevoUsuario]);
        setNuevoUsuario({
          nombre: "",
          telefono: "",
          email: "",
          domicilio: "",
          metodo_pago: "EFECTIVO",
          rol: "Usuario Invitado",
          password: "",
        });
      })
      .catch(() => alert("Error agregando usuario."));
  };

  const roles = [
    "Administrador",
    "Supervisor",
    "Empleado Altas",
    "Usuario Registrado",
    "Usuario Invitado",
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl text-neonOrange mb-6 text-center font-display">
        👥 Gestión de Usuarios
      </h1>

      {/* Formulario de alta */}
      <div className="bg-black/70 p-6 rounded-xl border border-neonOrange mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl mb-4 font-semibold text-neonOrange">Nuevo Usuario</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} placeholder="Nombre *" className="p-2 rounded bg-gray-800 text-white" />
          <input name="telefono" value={nuevoUsuario.telefono} onChange={handleChange} placeholder="Teléfono" className="p-2 rounded bg-gray-800 text-white" />
          <input name="email" value={nuevoUsuario.email} onChange={handleChange} placeholder="Email *" className="p-2 rounded bg-gray-800 text-white" />
          <input name="password" type="password" value={nuevoUsuario.password} onChange={handleChange} placeholder="Contraseña *" className="p-2 rounded bg-gray-800 text-white" />
          <input name="domicilio" value={nuevoUsuario.domicilio} onChange={handleChange} placeholder="Domicilio" className="p-2 rounded bg-gray-800 text-white" />
          <select name="metodo_pago" value={nuevoUsuario.metodo_pago} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white">
            <option value="EFECTIVO">Efectivo</option>
            <option value="POS">POS (Tarjeta)</option>
          </select>
          <select name="rol" value={nuevoUsuario.rol} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white col-span-2">
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <button onClick={agregarUsuario} className="mt-4 bg-neonOrange text-black px-4 py-2 rounded font-bold hover:bg-orange-400 transition">
          Agregar Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="w-full border-collapse border border-gray-700">
        <thead className="bg-gray-800 text-neonOrange">
          <tr>
            <th className="p-2 border border-gray-700">Nombre</th>
            <th className="p-2 border border-gray-700">Email</th>
            <th className="p-2 border border-gray-700">Rol</th>
            <th className="p-2 border border-gray-700">Teléfono</th>
            <th className="p-2 border border-gray-700">Método Pago</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={i} className="hover:bg-gray-800">
              <td className="p-2 border border-gray-700">{u.nombre}</td>
              <td className="p-2 border border-gray-700">{u.email}</td>
              <td className="p-2 border border-gray-700 text-neonOrange font-bold">{u.rol}</td>
              <td className="p-2 border border-gray-700">{u.telefono}</td>
              <td className="p-2 border border-gray-700">{u.metodo_pago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
