import { useState } from "react";
import { useEmployeeAuth } from "../../context/EmployeeAuthContext";

export default function AdminLogin() {
  const { loginEmployee } = useEmployeeAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ok = await loginEmployee(form.email, form.password);

    if (!ok) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">

      <div className="bg-gray-900 border border-orange-500 p-10 rounded-2xl w-full max-w-lg shadow-2xl">

        <h1 className="text-4xl font-black text-orange-500 mb-8 text-center">
          Ingreso Empleados
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              className="w-full p-4 bg-black border border-orange-600 rounded-xl text-xl"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">Contraseña</label>
            <input
              type="password"
              className="w-full p-4 bg-black border border-orange-600 rounded-xl text-xl"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black text-2xl py-4 rounded-xl transition"
          >
            INGRESAR
          </button>
        </form>

      </div>
    </div>
  );
}
