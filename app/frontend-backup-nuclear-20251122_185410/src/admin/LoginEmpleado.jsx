import { useState } from "react";
import { useEmployeeAuth } from "../../context/EmployeeAuthContext";

export default function LoginEmpleado() {
  const { loginEmployee } = useEmployeeAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    const result = await loginEmployee(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    // redireccionar según rol
    const rol = result.empleado.rol;

    if (rol === "ADMINISTRADOR") window.location.href = "/admin/panel";
    if (rol === "SUPERVISOR") window.location.href = "/admin/panel";
    if (rol === "EMPLEADO") window.location.href = "/admin/pedidos";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={enviar}
        className="bg-gray-900 p-10 rounded-2xl border-4 border-orange-500 w-full max-w-md"
      >
        <h1 className="text-4xl font-black text-orange-400 mb-6 text-center">
          Acceso Empleados
        </h1>

        {error && (
          <p className="bg-red-700 p-3 rounded text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          className="w-full p-4 mb-4 bg-black border-2 border-orange-500 rounded"
          placeholder="Email del empleado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-4 mb-6 bg-black border-2 border-orange-500 rounded"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-orange-500 p-4 rounded text-xl font-black hover:bg-orange-400">
          INGRESAR
        </button>
      </form>
    </div>
  );
}
