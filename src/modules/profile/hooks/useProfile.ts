import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usersService } from '../../../services/users';
import type { User } from '../../../types/user.types';

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      // En un entorno real, esto llamaría al backend
      // const response = await usersService.updateUserProfile(user.id, userData);
      
      // Por ahora, simulamos la actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar en el contexto (y localStorage)
      updateUser(userData);
      
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateProfile
  };
};