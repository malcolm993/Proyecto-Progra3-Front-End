import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse, ApiError } from '../../types/api.types';

// Configuración base de la API
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Crear instancia de axios con configuración base
const baseApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las requests
baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globalmente
baseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar auth
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/auth/login';
    }
    
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error de conexión',
      code: error.response?.status?.toString() || 'NETWORK_ERROR',
      details: error.response?.data,
    };
    
    return Promise.reject(apiError);
  }
);

// Función helper para manejar responses de la API
export const handleApiResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data,
    message: response.data?.message || 'Success',
    success: true,
    statusCode: response.status,
  };
};

// Función helper para manejar errors
export const handleApiError = (error: any): ApiError => {
  if (error.code && error.message) {
    return error as ApiError;
  }
  
  return {
    message: 'Error desconocido',
    code: 'UNKNOWN_ERROR',
    details: error,
  };
};

export default baseApi;