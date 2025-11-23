import { useEmployeeAuth } from "../../context/EmployeeAuthContext";

export default function PanelAdmin() {
  const { employee, logoutEmployee } = useEmployeeAuth();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-black text-orange-500 mb-4">
        Panel Administrativo
      </h1>

      <p className="text-xl mb-8">
        Bienvenido <b>{employee?.nombre}</b> — Rol:{" "}
        <span className="text-orange-400">{employee?.rol}</span>
      </p>

      <div className="space-x-4 mb-10">
        <a href="/admin/productos" className="btn-admin">Productos</a>
        <a href="/admin/pedidos" className="btn-admin">Pedidos</a>
        <a href="/admin/usuarios" className="btn-admin">Clientes</a>
      </div>

      <button
        onClick={logoutEmployee}
        className="bg-red-600 px-6 py-3 rounded-xl"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
