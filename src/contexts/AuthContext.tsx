import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserLoginData, UserRegisterData, AuthUser } from '../types/user.types';
import { authService } from '../services/auth/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: UserLoginData) => Promise<AuthUser>;        // ✅ Corregido
  register: (registerData: UserRegisterData) => Promise<AuthUser>; // ✅ Corregido
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Función helper para manejar errores unknown
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as any).message);
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Error desconocido';
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        // ✅ Verificar token válido con el backend
        const response = await authService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Token inválido - limpiar
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData: UserLoginData): Promise<AuthUser> => {
    try {
      setIsLoading(true);

      // ✅ Usar el service
      const response = await authService.login(loginData);

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // ✅ CORREGIDO: Guardar token y solo datos de usuario
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        return response.data; // ✅ Retorna AuthUser completo
      } else {
        throw new Error(response.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: UserRegisterData): Promise<AuthUser> => {
    try {
      setIsLoading(true);
      
      // ✅ Usar el service
      const response = await authService.register(registerData);
      
      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        // ✅ CORREGIDO: Guardar token y solo datos de usuario
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        return response.data; // ✅ Retorna AuthUser completo
      } else {
        throw new Error(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    try {
      // ✅ Intentar logout en el servidor (pero no bloquear si falla)
      authService.logout().catch(console.error);
    } finally {
      // ✅ Siempre limpiar localStorage y estado
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData, updatedAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};