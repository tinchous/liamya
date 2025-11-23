import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "../../context/EmployeeAuthContext";
import { Lock, User } from "lucide-react";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const { loginEmployee } = useEmployeeAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/empleados/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        return;
      }

      // Guardar en contexto
      loginEmployee(data.empleado);

      navigate("/admin");
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="bg-gray-900 border-4 border-orange-500 p-10 rounded-3xl w-full max-w-xl shadow-2xl">
        <h1 className="text-4xl font-black text-center text-orange-500 mb-8">
          Login de Empleados
        </h1>

        {error && (
          <p className="bg-red-700 text-white px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center gap-3 mb-2 text-orange-400">
              <User /> Correo del empleado
            </label>
            <input
              type="email"
              required
              placeholder="empleado@empresa.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 bg-black/40 border-4 border-orange-600 rounded-2xl text-xl"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-3 mb-2 text-orange-400">
              <Lock /> Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-4 bg-black/40 border-4 border-orange-600 rounded-2xl text-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-black py-4 text-2xl font-black rounded-2xl hover:bg-orange-400 transition mt-4"
          >
            INGRESAR
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 italic text-lg">
          Solo personal autorizado
        </p>
      </div>
    </div>
  );
}
