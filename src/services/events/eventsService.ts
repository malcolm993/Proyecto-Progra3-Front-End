import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { Event, EventCreateData, EventFilters } from '../../types/event.types';
import type { ApiResponse } from '../../types/api.types';
import { ROUTES } from '../../utils/constants/routes';

export const eventsService = {
  // Obtener todos los eventos
  async getEvents(filters?: EventFilters): Promise<ApiResponse<Event[]>> {
    try {
      const response = await baseApi.get(ROUTES.API.EVENTS.BASE, { params: filters });
      return handleApiResponse<Event[]>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener evento por ID
  async getEventById(id: string): Promise<ApiResponse<Event>> {
    try {
      // ✅ CORREGIDO - BY_ID es función
      const response = await baseApi.get(ROUTES.API.EVENTS.BY_ID(id));
      return handleApiResponse<Event>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Crear nuevo evento
  async createEvent(eventData: EventCreateData): Promise<ApiResponse<Event>> {
    try {
      const response = await baseApi.post(ROUTES.API.EVENTS.BASE, eventData);
      return handleApiResponse<Event>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Actualizar evento
  async updateEvent(id: string, eventData: Partial<EventCreateData>): Promise<ApiResponse<Event>> {
    try {
      // ✅ CORREGIDO - BY_ID es función
      const response = await baseApi.put(ROUTES.API.EVENTS.BY_ID(id), eventData);
      return handleApiResponse<Event>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Eliminar evento
  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    try {
      // ✅ CORREGIDO - BY_ID es función
      const response = await baseApi.delete(ROUTES.API.EVENTS.BY_ID(id));
      return handleApiResponse<void>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // ✅ FALTABA - Registrarse a evento
  async registerForEvent(eventId: string): Promise<ApiResponse<any>> {
    try {
      const response = await baseApi.post(ROUTES.API.EVENTS.REGISTER(eventId));
      return handleApiResponse<any>(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};