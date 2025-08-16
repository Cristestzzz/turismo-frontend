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

  // Restaurar usuario si existe token en localStorage al cargar la app
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      // Aquí podrías decodificar el token o hacer una petición al backend para obtener los datos del usuario
      // Ejemplo simple: solo restaurar el token
      setUser({ token } as AuthUser);
      // Si tienes endpoint para obtener datos del usuario, haz la petición aquí y actualiza setUser
    }
  }, []);

  // login ahora guarda el token en localStorage
  const login = (userData: AuthUser & { token?: string }) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  // logout elimina el token de localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
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
