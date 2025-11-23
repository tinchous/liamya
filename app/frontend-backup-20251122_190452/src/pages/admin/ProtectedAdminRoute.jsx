import { Navigate } from "react-router-dom";
import { useEmployeeAuth } from "../../context/EmployeeAuthContext";

export default function ProtectedAdminRoute({ allowedRoles, children }) {
  const { employee } = useEmployeeAuth();

  if (!employee) return <Navigate to="/admin/login" replace />;

  if (allowedRoles && !allowedRoles.includes(employee.rol)) {
    return (
      <div className="text-center text-white p-20 text-4xl">
        ❌ No tenés permisos para acceder a esta sección.
      </div>
    );
  }

  return children;
}
