import type { Event, Registration } from '../../types';
import type { UserRole, EventType, EventStatus } from '../../utils/constants'; // ✅ Corregido

// Types específicos para el panel de administración
export interface AdminStats {
  totalEvents: number;
  totalParticipants: number;
  upcomingEvents: number;
  averageAttendance: number;
  activeRegistrations: number;  
}

export interface EventWithAttendees extends Event {
  attendees: Registration[];
}

export interface UserManagementFilters {
  role?: UserRole;
  search?: string; 
}

export interface EventManagementFilters {
  type?: EventType;
  status?: EventStatus;
}