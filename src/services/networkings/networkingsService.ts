import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { ContactRequest, Suggestion } from '../../types/networking.types';
import type { ApiResponse } from '../../types/api.types';
import { ROUTES } from '../../utils/constants/routes';

export const networkingService = {
  // Enviar solicitud de contacto
  async sendContactRequest(toUserId: string, message?: string): Promise<ApiResponse<ContactRequest>> {
    try {
      const response = await baseApi.post('/api/networking/contacts', {
        toUserId,
        message
      });
      return handleApiResponse<ContactRequest>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Aceptar/rechazar solicitud
  async respondToContactRequest(requestId: string, accept: boolean): Promise<ApiResponse<ContactRequest>> {
    try {
      const response = await baseApi.patch(`/api/networking/contacts/${requestId}`, {
        status: accept ? 'accepted' : 'rejected'
      });
      return handleApiResponse<ContactRequest>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener sugerencias de conexión
  async getConnectionSuggestions(): Promise<ApiResponse<Suggestion[]>> {
    try {
      const response = await baseApi.get(ROUTES.API.USERS.SUGGESTIONS);
      return handleApiResponse<Suggestion[]>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};