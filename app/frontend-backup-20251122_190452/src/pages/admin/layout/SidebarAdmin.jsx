import { Link } from "react-router-dom";
import { useEmployeeAuth } from "../../../context/EmployeeAuthContext";

export default function SidebarAdmin() {
  const { employee, logoutEmployee } = useEmployeeAuth();

  const links = [
    { to: "/admin/productos", label: "Productos" },
    { to: "/admin/pedidos", label: "Pedidos" },
    { to: "/admin/usuarios", label: "Clientes" },
    { to: "/admin/empleados", label: "Empleados" },
    { to: "/admin/auditoria", label: "Auditoría" },
  ];

  return (
    <div className="w-72 bg-gray-950 border-r border-orange-600 p-6 space-y-6">

      <h2 className="text-3xl font-black text-orange-500">ADMIN</h2>

      <nav className="space-y-4">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="block bg-gray-800 hover:bg-orange-600 transition p-4 rounded-xl font-bold text-lg"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logoutEmployee}
        className="w-full bg-red-600 hover:bg-red-500 transition p-4 rounded-xl mt-10 font-bold"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
