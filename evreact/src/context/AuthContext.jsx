import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("sesion_volcan");
    return guardado ? JSON.parse(guardado) : null;
  });

  const normalizarUsuario = (data) => ({
    ...data,
    email: data.correo, // Navbar y RutaProtegida leen usuario.email
    rol: data.rol?.toLowerCase(), // Navbar y RutaProtegida esperan 'admin'
  });

  const login = async (correo, password) => {
    const rawData = await api.login(correo, password);
    const userData = normalizarUsuario(rawData);
    setUsuario(userData);
    localStorage.setItem("sesion_volcan", JSON.stringify(userData));
    return userData;
  };

  const registrar = async (datosUsuario) => {
    const rawData = await api.registrar(datosUsuario);
    const nuevoUsuario = normalizarUsuario(rawData);
    setUsuario(nuevoUsuario);
    localStorage.setItem("sesion_volcan", JSON.stringify(nuevoUsuario));
    return nuevoUsuario;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("sesion_volcan");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
