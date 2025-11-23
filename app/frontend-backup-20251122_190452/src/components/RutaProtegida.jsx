import { Navigate } from "react-router-dom";
import { useEmployeeAuth } from "../context/EmployeeAuthContext";

export default function RutaProtegida({ children, roles }) {
  const { employee, loading } = useEmployeeAuth();

  if (loading) return <div className="text-white p-10">Cargando...</div>;

  if (!employee) return <Navigate to="/admin/login" />;

  if (roles && !roles.includes(employee.rol)) {
    return <Navigate to="/admin/denegado" />;
  }

  return children;
}
