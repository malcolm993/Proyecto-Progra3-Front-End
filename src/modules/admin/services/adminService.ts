import { eventsService } from '../../../services/events';
import type { Event, Registration } from '../../../types';
import type { AdminStats, EventWithAttendees } from '../types';

// Mock data para asistentes (en un sistema real, esto vendría del backend)
const mockAttendees: Record<string, Registration[]> = {
  '1': [ // Asistentes para evento ID 1
    {
      id: 'reg1',
      eventId: '1',
      participantId: 'user101',
      registrationDate: new Date('2025-01-15'),
      status: 'confirmed',
      attended: false
    },
    {
      id: 'reg2',
      eventId: '1', 
      participantId: 'user102',
      registrationDate: new Date('2025-01-16'),
      status: 'confirmed',
      attended: false
    }
  ],
  '2': [ // Asistentes para evento ID 2
    {
      id: 'reg3',
      eventId: '2',
      participantId: 'user103',
      registrationDate: new Date('2025-01-20'),
      status: 'confirmed', 
      attended: false
    }
  ]
};

// Mock data para usuarios (para información de asistentes)
const mockUsers = {
  'user101': {
    id: 'user101',
    name: 'Ana García',
    email: 'ana@empresa.com',
    company: 'Tech Solutions',
    industry: 'Tecnología'
  },
  'user102': {
    id: 'user102', 
    name: 'Carlos López',
    email: 'carlos@consultora.com',
    company: 'Business Consultants',
    industry: 'Consultoría'
  },
  'user103': {
    id: 'user103',
    name: 'María Rodríguez', 
    email: 'maria@startup.com',
    company: 'Innovation Labs',
    industry: 'Tecnología'
  }
};

export const adminService = {
  // Obtener estadísticas para el dashboard
  async getAdminStats(organizerId: string): Promise<AdminStats> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // En un sistema real, esto calcularía estadísticas del backend
    return {
      totalEvents: 3,
      totalParticipants: 45,
      upcomingEvents: 2,
      averageAttendance: 75
    };
  },

  // Obtener eventos del organizador con asistentes
  async getOrganizerEvents(organizerId: string): Promise<EventWithAttendees[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Obtener todos los eventos
    const eventsResponse = await eventsService.getEvents();
    const organizerEvents = eventsResponse.data.filter(event => event.organizerId === organizerId);
    
    // Agregar información de asistentes
    return organizerEvents.map(event => ({
      ...event,
      attendees: mockAttendees[event.id] || []
    }));
  },

  // Obtener asistentes detallados para un evento específico
  async getEventAttendees(eventId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const attendees = mockAttendees[eventId] || [];
    
    // Enriquecer con información de usuario
    return attendees.map(registration => ({
      ...registration,
      user: mockUsers[registration.participantId]
    }));
  },

  // Exportar datos de asistentes
  async exportAttendees(eventId: string, format: 'csv' | 'pdf'): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular generación de archivo
    const attendees = await this.getEventAttendees(eventId);
    const fileName = `asistentes-evento-${eventId}-${new Date().getTime()}.${format}`;
    
    return fileName;
  },

  // Crear nuevo evento (específico para admin)
  async createEvent(eventData: any): Promise<Event> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Usar el service existente pero con validación de organizador
    const response = await eventsService.createEvent(eventData);
    return response.data;
  }
};