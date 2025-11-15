import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[]; // ✅ Permite rol único o array
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user) {
    // ✅ Lógica para manejar rol único o array
    const hasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(user.role)  // Si es array, verifica inclusión
      : user.role === requiredRole;       // Si es string, verifica igualdad

    if (!hasRequiredRole) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para acceder a esta página.</p>
          <p>Rol requerido: {Array.isArray(requiredRole) ? requiredRole.join(' o ') : requiredRole}</p>
          <p>Tu rol: {user.role}</p>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;