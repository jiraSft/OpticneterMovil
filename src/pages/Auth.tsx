import React, { createContext, useState, useContext, ReactNode } from "react";
import { IonToast } from "@ionic/react";

// Creación del contexto con un valor predeterminado
export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

// Define el tipo de las props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const login = () => {
    setIsAuthenticated(true);
    setToastMessage("Inicio de sesión exitoso");
    setShowToast(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToastMessage("Sesión cerrada correctamente");
    setShowToast(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="top"
      />
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
