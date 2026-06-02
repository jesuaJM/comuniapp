import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(() => {
    const stored = localStorage.getItem("comuniapp_usuarios");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const sesion = localStorage.getItem("comuniapp_sesion");
    if (sesion) setUsuario(JSON.parse(sesion));
  }, []);

  const registrar = ({ nombre, correo, telefono, contrasena, tipo }) => {
    const yaExiste = usuarios.find((u) => u.correo === correo);
    if (yaExiste) return { ok: false, error: "Este correo ya está registrado." };

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      correo,
      telefono,
      tipo,
      contrasena,
      creadoEn: new Date().toISOString(),
    };

    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("comuniapp_usuarios", JSON.stringify(nuevosUsuarios));

    const sesion = { ...nuevoUsuario };
    delete sesion.contrasena;
    setUsuario(sesion);
    localStorage.setItem("comuniapp_sesion", JSON.stringify(sesion));

    return { ok: true };
  };

  const iniciarSesion = ({ correo, contrasena }) => {
    const encontrado = usuarios.find(
      (u) => u.correo === correo && u.contrasena === contrasena
    );
    if (!encontrado)
      return { ok: false, error: "Correo o contraseña incorrectos." };

    const sesion = { ...encontrado };
    delete sesion.contrasena;
    setUsuario(sesion);
    localStorage.setItem("comuniapp_sesion", JSON.stringify(sesion));
    return { ok: true };
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("comuniapp_sesion");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, registrar, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
