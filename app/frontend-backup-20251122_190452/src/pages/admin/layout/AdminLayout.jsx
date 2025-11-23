import SidebarAdmin from "./SidebarAdmin";
import { useEmployeeAuth } from "../../../context/EmployeeAuthContext";

export default function AdminLayout({ children }) {
  const { employee } = useEmployeeAuth();

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* Sidebar */}
      <SidebarAdmin />

      {/* Contenido */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-black text-orange-500 mb-4">
          Panel Administrativo
        </h1>

        <p className="text-lg mb-6">
          Bienvenido <b>{employee?.nombre}</b> — Rol:{" "}
          <span className="text-orange-400">{employee?.rol}</span>
        </p>

        <div className="bg-gray-900/70 p-8 rounded-2xl border border-orange-600 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
