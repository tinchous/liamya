import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", telefono: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // simplificado: login con email O teléfono
    if (!form.email && !form.telefono) return alert("Ingresá email o teléfono");
    if (!form.password) return alert("Ingresá tu contraseña");

    // acá deberíamos validar contra backend, pero por ahora:
    const usuario = {
      nombre: "Cliente",
      email: form.email,
      telefono: form.telefono
    };

    login(usuario);
    navigate("/productos");
  };

  return (
    <>
      <Header />

      <div className="pt-60 pb-32 max-w-xl mx-auto text-center text-white">
        <h1 className="text-6xl font-black text-orange-500 mb-12">
          INGRESAR
        </h1>

        <form onSubmit={handleLogin} className="bg-gray-900 p-12 rounded-3xl border-8 border-orange-500 space-y-6">

          <input
            placeholder="Email"
            className="w-full p-6 bg-black/50 border-4 border-orange-500 rounded-2xl text-xl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Teléfono"
            className="w-full p-6 bg-black/50 border-4 border-orange-500 rounded-2xl text-xl"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />

          <input
            placeholder="Contraseña"
            type="password"
            className="w-full p-6 bg-black/50 border-4 border-orange-500 rounded-2xl text-xl"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full py-6 bg-green-500 rounded-2xl text-black text-3xl font-black hover:bg-green-400">
            INGRESAR
          </button>

          <p className="text-xl mt-6">
            ¿No tenés cuenta? {" "}
            <Link className="text-orange-400 underline" to="/register">
              Registrate acá
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}
