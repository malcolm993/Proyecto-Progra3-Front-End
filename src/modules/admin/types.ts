import type { Event, Registration } from '../../types';

// Types específicos para el panel de administración
export interface AdminStats {
  totalEvents: number;
  totalParticipants: number;
  upcomingEvents: number;
  averageAttendance: number;
}

export interface EventWithAttendees extends Event {
  attendees: Registration[];
}

export interface ExportOptions {
  format: 'csv' | 'pdf';
  includeContactInfo: boolean;
  eventId?: string;
}