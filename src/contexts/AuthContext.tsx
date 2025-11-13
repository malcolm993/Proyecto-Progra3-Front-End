import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserLoginData, UserRegisterData } from '../types/user.types';
import { authService } from '../services/auth/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: UserLoginData) => Promise<void>;
  register: (registerData: UserRegisterData) => Promise<void>;
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
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData: UserLoginData): Promise<void> => {
    try {
      setIsLoading(true);

      // ✅ Usar el service en lugar del mock directo
      const response = await authService.login(loginData);

      if (response.success && response.data) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error)); // ✅ CORREGIDO
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: UserRegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      
      // ✅ Usar el service
      const response = await authService.register(registerData);
      
      if (response.success && response.data) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(getErrorMessage(error)); // ✅ CORREGIDO
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
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

  // ✅ FALTABA ESTE RETURN
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; // ✅ FALTABA ESTE CIERRE

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};