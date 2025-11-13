import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { User, UserLoginData, UserRegisterData } from '../../types/user.types';
import type { ApiResponse } from '../../types/api.types';

// TODO: Reemplazar con endpoints reales cuando tengas el backend
const MOCK_DELAY = 1000;

export const authService = {
  // Login de usuario
  async login(loginData: UserLoginData): Promise<ApiResponse<User>> {
    try {
      // TODO: Reemplazar con llamada real
      // return await baseApi.post('/auth/login', loginData);
      
      // Mock por ahora
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      
      const mockUser: User = loginData.email.includes('organizador') 
        ? {
            id: '1',
            email: loginData.email,
            name: 'Organizador Demo',
            role: 'organizer',
            company: 'Empresa Organizadora SA',
            industry: 'Tecnología',
            interests: ['networking', 'innovación'],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        : {
            id: '2',
            email: loginData.email,
            name: 'Participante Demo',
            role: 'participant',
            company: 'Otra Empresa SRL',
            industry: 'Marketing',
            interests: ['desarrollo profesional', 'ferias'],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

      return {
        data: mockUser,
        message: 'Login exitoso',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Registro de usuario
  async register(registerData: UserRegisterData): Promise<ApiResponse<User>> {
    try {
      // TODO: Reemplazar con llamada real
      // return await baseApi.post('/auth/register', registerData);
      
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: registerData.email,
        name: registerData.name,
        role: registerData.role,
        company: registerData.company,
        industry: registerData.industry,
        interests: registerData.interests || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        data: newUser,
        message: 'Registro exitoso',
        success: true,
        statusCode: 201,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Verificar token (me)
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // TODO: Reemplazar con llamada real
      // return await baseApi.get('/auth/me');
      
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('No user data found');
      }

      const user: User = JSON.parse(userData);
      
      return {
        data: user,
        message: 'Usuario obtenido',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Logout
  async logout(): Promise<ApiResponse<void>> {
    try {
      // TODO: Reemplazar con llamada real si el backend necesita saber del logout
      // return await baseApi.post('/auth/logout');
      
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      
      return {
        data: undefined,
        message: 'Logout exitoso',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
};