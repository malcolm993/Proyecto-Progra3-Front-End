import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { User, UserLoginData, UserRegisterData, AuthUser } from '../../types/user.types';
import type { ApiResponse } from '../../types/api.types';
import { ROUTES } from '../../utils/constants/routes';

// Claves para localStorage
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

export const authService = {
  // Login de usuario
  async login(loginData: UserLoginData): Promise<ApiResponse<AuthUser>> {
    try {
      const response = await baseApi.post(ROUTES.API.AUTH.LOGIN, loginData);
      const result = handleApiResponse<AuthUser>(response);
      
      // ✅ Guardar token y datos de usuario en localStorage
      if (result.success && result.data) {
        localStorage.setItem(AUTH_TOKEN_KEY, result.data.token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(result.data.user));
      }
      
      return result;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Registro de usuario
  async register(registerData: UserRegisterData): Promise<ApiResponse<AuthUser>> {
    try {
      const response = await baseApi.post(ROUTES.API.AUTH.REGISTER, registerData);
      const result = handleApiResponse<AuthUser>(response);
      
      // ✅ Guardar token y datos de usuario en localStorage
      if (result.success && result.data) {
        localStorage.setItem(AUTH_TOKEN_KEY, result.data.token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(result.data.user));
      }
      
      return result;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Verificar token (me) - ✅ Este sí retorna solo User
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await baseApi.get(ROUTES.API.AUTH.ME);
      return handleApiResponse<User>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Logout
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await baseApi.post(ROUTES.API.AUTH.LOGOUT);
      
      // ✅ Limpiar localStorage independientemente de la respuesta del servidor
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      
      return handleApiResponse<void>(response);
    } catch (error) {
      // ✅ Limpiar localStorage incluso si falla la llamada al servidor
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      throw handleApiError(error);
    }
  },

  // ✅ OPCIONAL: Método para refrescar token
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await baseApi.post(ROUTES.API.AUTH.REFRESH);
      const result = handleApiResponse<{ token: string }>(response);
      
      if (result.success && result.data) {
        localStorage.setItem(AUTH_TOKEN_KEY, result.data.token);
      }
      
      return result;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};