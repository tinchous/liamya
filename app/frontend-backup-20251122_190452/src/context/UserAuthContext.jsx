import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const [cliente, setCliente] = useState(null);

  // Cargar sesión desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cliente");
    if (saved) {
      try {
        setCliente(JSON.parse(saved));
      } catch {
        localStorage.removeItem("cliente");
      }
    }
  }, []);

  const loginCliente = (data) => {
    setCliente(data);
    localStorage.setItem("cliente", JSON.stringify(data));
  };

  const logoutCliente = () => {
    setCliente(null);
    localStorage.removeItem("cliente");
  };

  return (
    <UserAuthContext.Provider value={{ cliente, loginCliente, logoutCliente }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
