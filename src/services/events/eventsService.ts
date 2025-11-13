import baseApi, { handleApiResponse, handleApiError } from '../api/baseApi';
import type { Event, EventCreateData, EventFilters } from '../../types/event.types';
import type { ApiResponse, PaginatedResponse } from '../../types/api.types';

// Mock data para desarrollo
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Charla de Inteligencia Artificial en Negocios',
    description: 'Una charla interactiva sobre cómo implementar AI en tu empresa para mejorar procesos y tomar mejores decisiones.',
    date: new Date('2025-03-15'),
    location: 'Auditorio Principal - Centro de Convenciones',
    type: 'talk',
    organizerId: '1',
    speaker: 'Dra. María González',
    speakerCompany: 'TechSolutions AI',
    startTime: new Date('2025-03-15T18:00:00'),
    endTime: new Date('2025-03-15T20:00:00'),
    maxParticipants: 100,
    currentParticipants: 45,
    tags: ['tecnología', 'AI', 'negocios', 'innovación'],
    imageUrl: '/images/ai-event.jpg',
    isActive: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    title: 'Feria Anual de Networking Empresarial',
    description: 'Conecta con empresarios, emprendedores y profesionales de diferentes industrias en nuestro evento anual de networking.',
    date: new Date('2025-04-20'),
    location: 'Hall Central - Hotel Grand',
    type: 'fair',
    organizerId: '1',
    speaker: 'Carlos Rodríguez',
    speakerCompany: 'Cámara de Comercio',
    startTime: new Date('2025-04-20T09:00:00'),
    endTime: new Date('2025-04-20T18:00:00'),
    maxParticipants: 300,
    currentParticipants: 300,
    tags: ['networking', 'emprendedores', 'negocios', 'contactos'],
    imageUrl: '/images/networking-fair.jpg',
    isActive: true,
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
  },
  {
    id: '3',
    title: 'Ronda de Negocios - Sector Tecnología',
    description: 'Oportunidad exclusiva para empresas de tecnología de conectar con inversionistas y posibles socios comerciales.',
    date: new Date('2025-02-28'),
    location: 'Sala de Juntas - Torre Empresarial',
    type: 'business_round',
    organizerId: '1',
    speaker: 'Ana López',
    speakerCompany: 'Venture Capital Partners',
    startTime: new Date('2025-02-28T14:00:00'),
    endTime: new Date('2025-02-28T17:00:00'),
    maxParticipants: 50,
    currentParticipants: 32,
    tags: ['inversión', 'tecnología', 'startups', 'financiamiento'],
    imageUrl: '/images/business-round.jpg',
    isActive: true,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-08'),
  },
];

export const eventsService = {
  // Obtener todos los eventos
  async getEvents(filters?: EventFilters): Promise<ApiResponse<Event[]>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.get('/events', { params: filters });
      // return handleApiResponse<Event[]>(response);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredEvents = [...mockEvents];
      
      // Aplicar filtros simples
      if (filters?.type) {
        filteredEvents = filteredEvents.filter(event => event.type === filters.type);
      }
      
      if (filters?.query) {
        const query = filters.query.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return {
        data: filteredEvents,
        message: 'Eventos obtenidos exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Obtener evento por ID
  async getEventById(id: string): Promise<ApiResponse<Event>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.get(`/events/${id}`);
      // return handleApiResponse<Event>(response);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const event = mockEvents.find(e => e.id === id);
      
      if (!event) {
        throw {
          message: 'Evento no encontrado',
          code: '404',
        };
      }
      
      return {
        data: event,
        message: 'Evento obtenido exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Crear nuevo evento
  async createEvent(eventData: EventCreateData): Promise<ApiResponse<Event>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.post('/events', eventData);
      // return handleApiResponse<Event>(response);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      const userData = localStorage.getItem('userData');
      const currentUser = userData ? JSON.parse(userData) : null;
      
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        organizerId: currentUser.id, // Suponiendo que hay una función para obtener el ID del usuario actual
        currentParticipants: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockEvents.push(newEvent);
      
      return {
        data: newEvent,
        message: 'Evento creado exitosamente',
        success: true,
        statusCode: 201,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Actualizar evento
  async updateEvent(id: string, eventData: Partial<EventCreateData>): Promise<ApiResponse<Event>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.put(`/events/${id}`, eventData);
      // return handleApiResponse<Event>(response);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const eventIndex = mockEvents.findIndex(e => e.id === id);
      
      if (eventIndex === -1) {
        throw {
          message: 'Evento no encontrado',
          code: '404',
        };
      }
      
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        ...eventData,
        updatedAt: new Date(),
      };
      
      return {
        data: mockEvents[eventIndex],
        message: 'Evento actualizado exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Eliminar evento (soft delete)
  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    try {
      // TODO: Reemplazar con llamada real
      // const response = await baseApi.delete(`/events/${id}`);
      // return handleApiResponse<void>(response);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const eventIndex = mockEvents.findIndex(e => e.id === id);
      
      if (eventIndex === -1) {
        throw {
          message: 'Evento no encontrado',
          code: '404',
        };
      }
      
      mockEvents[eventIndex].isActive = false;
      
      return {
        data: undefined,
        message: 'Evento eliminado exitosamente',
        success: true,
        statusCode: 200,
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
};