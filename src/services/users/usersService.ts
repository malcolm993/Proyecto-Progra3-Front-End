import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { User } from '../../types/user.types';
import type { ApiResponse } from '../../types/api.types';

export const usersService = {
  // Obtener perfil de usuario
  async getUserProfile(id: string): Promise<ApiResponse<User>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.get(`/users/${id}`);
      // return handleApiResponse<User>(response);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mock data
      const user: User = {
        id,
        email: 'usuario@ejemplo.com',
        name: 'Usuario Demo',
        role: 'participant',
        company: 'Empresa Demo',
        industry: 'Tecnología',
        interests: ['networking', 'desarrollo'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return {
        data: user,
        message: 'Perfil obtenido exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Actualizar perfil de usuario
  async updateUserProfile(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.put(`/users/${id}`, userData);
      // return handleApiResponse<User>(response);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser: User = {
        id,
        email: userData.email || 'usuario@ejemplo.com',
        name: userData.name || 'Usuario Demo',
        role: userData.role || 'participant',
        company: userData.company,
        industry: userData.industry,
        interests: userData.interests || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return {
        data: updatedUser,
        message: 'Perfil actualizado exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
};