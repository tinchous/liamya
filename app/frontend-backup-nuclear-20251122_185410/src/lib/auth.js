export const usuarios = [
  { id: 1, nombre: "Tino", email: "tino@liamyahir.com", password: "1234", rol: "ADMINISTRADOR" },
  { id: 2, nombre: "Ana", email: "ana@liamyahir.com", password: "1234", rol: "SUPERVISOR" },
  { id: 3, nombre: "Juan", email: "juan@liamyahir.com", password: "1234", rol: "EMPLEADO_ALTAS" }
];

export const getUsuarioActual = () => {
  const user = localStorage.getItem("usuarioActual");
  return user ? JSON.parse(user) : null;
};

export const login = (email, password) => {
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    return usuario;
  }
  return null;
};

export const logout = () => localStorage.removeItem("usuarioActual");

export const tienePermiso = (rolRequerido) => {
  const usuario = getUsuarioActual();
  if (!usuario) return false;
  
  const permisos = {
    ADMINISTRADOR: ["ADMINISTRADOR", "SUPERVISOR", "EMPLEADO_ALTAS"],
    SUPERVISOR: ["SUPERVISOR", "EMPLEADO_ALTAS"],
    EMPLEADO_ALTAS: ["EMPLEADO_ALTAS"]
  };
  
  return permisos[usuario.rol]?.includes(rolRequerido) || false;
};
