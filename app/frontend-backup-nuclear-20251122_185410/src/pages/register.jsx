import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // ------------------------------
      // ⚠️ SI YA EXISTE → ERROR 409
      // ------------------------------
      if (res.status === 409) {
        const data = await res.json();
        setMensaje(`⚠️ ${data.message}`);
        return;
      }

      const data = await res.json();

      if (data.status === "success") {
        setMensaje("✔ Usuario registrado correctamente");
        setForm({
          nombre: "",
          telefono: "",
          email: "",
          direccion: "",
          password: "",
        });
      } else {
        setMensaje("❌ Error desconocido al registrar");
      }
    } catch (err) {
      setMensaje("❌ Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto text-white">
      <h1 className="text-4xl font-black text-orange-400 mb-8">Crear Cuenta</h1>

      {mensaje && (
        <div className="mb-6 p-4 bg-black/40 border border-orange-500 rounded-xl text-lg">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-4 bg-black/60 border-2 border-orange-500 rounded-xl"
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-4 bg-black/60 border-2 border-orange-500 rounded-xl"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 bg-black/60 border-2 border-orange-500 rounded-xl"
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          className="w-full p-4 bg-black/60 border-2 border-orange-500 rounded-xl"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 bg-black/60 border-2 border-orange-500 rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-400 text-black text-2xl font-black py-4 rounded-xl"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
