import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { User } from '../../types/user.types';
import type { ApiResponse } from '../../types/api.types';
import { ROUTES } from '../../utils/constants/routes';

export const usersService = {
  // Obtener perfil de usuario (para ver perfiles públicos)
  async getUserProfile(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await baseApi.get(ROUTES.API.USERS.BY_ID(id));
      return handleApiResponse<User>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Actualizar perfil del usuario actual
  async updateUserProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await baseApi.put(ROUTES.API.USERS.PROFILE, userData);
      return handleApiResponse<User>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener perfil del usuario actual
  async getCurrentUserProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await baseApi.get(ROUTES.API.USERS.PROFILE);
      return handleApiResponse<User>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};