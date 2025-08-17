import React, { createContext, useContext, useState } from 'react';

export type AuthUser = {
  id: number; // ID del usuario operador
  email: string;
  nombre: string;
  apellido: string;
  isOperador?: boolean;
  token?: string; // Permite guardar el token JWT
};

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Restaurar usuario completo desde localStorage al cargar la app
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData && !user) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // login ahora guarda todos los datos del usuario en localStorage
  const login = (userData: AuthUser & { token?: string }) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  // logout elimina todos los datos del usuario de localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
