import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { Registration } from '../../types/registration.types';
import type { ApiResponse } from '../../types/api.types';
import { ROUTES } from '../../utils';

export const registrationsService = {
  // Registrar a un evento
  async registerForEvent(eventId: string): Promise<ApiResponse<Registration>> {
    try {
      const response = await baseApi.post(ROUTES.API.REGISTRATIONS.BASE, {
        eventId
      });
      return handleApiResponse<Registration>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener mis registros
  async getMyRegistrations(): Promise<ApiResponse<Registration[]>> {
    try {
      const response = await baseApi.get(ROUTES.API.REGISTRATIONS.MY_REGISTRATIONS);
      return handleApiResponse<Registration[]>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Cancelar registro
  async cancelRegistration(registrationId: string): Promise<ApiResponse<void>> {
    try {
      const response = await baseApi.delete(ROUTES.API.REGISTRATIONS.BY_ID(registrationId));
      return handleApiResponse<void>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener asistentes de un evento (para organizadores)
  async getEventAttendees(eventId: string): Promise<ApiResponse<Registration[]>> {
    try {
      const response = await baseApi.get(ROUTES.API.REGISTRATIONS.BY_EVENT(eventId));
      return handleApiResponse<Registration[]>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};