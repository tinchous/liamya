import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    // Para demo: usuario admin / pass 1234
    if (usuario === "admin" && password === "1234") {
      localStorage.setItem("adminToken", "TOKEN_DEMO");
      navigate("/admin/dashboard");
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-[0_0_25px_#ff8c00] w-80">
        <h1 className="text-2xl font-display text-center text-neonOrange mb-6">
          Login Admin
        </h1>
        <form onSubmit={login} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-black/60 border border-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-neonOrange text-black font-bold py-2 rounded hover:bg-orange-400"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
