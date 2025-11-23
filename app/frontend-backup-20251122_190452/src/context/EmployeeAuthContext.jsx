import { createContext, useContext, useState, useEffect } from "react";

const EmployeeAuthContext = createContext();

export function EmployeeAuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada
  useEffect(() => {
    const saved = localStorage.getItem("employee_session");
    if (saved) {
      setEmployee(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const loginEmployee = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/empleados/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Credenciales incorrectas" };
      }

      setEmployee(data.empleado);
      localStorage.setItem("employee_session", JSON.stringify(data.empleado));

      return { success: true, empleado: data.empleado };

    } catch (err) {
      return { success: false, error: "Error de conexión con el servidor" };
    }
  };

  const logoutEmployee = () => {
    localStorage.removeItem("employee_session");
    setEmployee(null);
  };

  const value = {
    employee,
    loading,
    loginEmployee,
    logoutEmployee,
    isAdmin: employee?.rol === "ADMINISTRADOR",
    isSupervisor: employee?.rol === "SUPERVISOR",
    isEmpleado: employee?.rol === "EMPLEADO",
  };

  return (
    <EmployeeAuthContext.Provider value={value}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export function useEmployeeAuth() {
  return useContext(EmployeeAuthContext);
}
