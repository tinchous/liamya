import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // cargar usuario de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cliente");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        console.error("Error leyendo cliente guardado");
      }
    }
  }, []);

  // guardar usuario en localStorage
  const login = (data) => {
    setUser(data);
    localStorage.setItem("cliente", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cliente");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
