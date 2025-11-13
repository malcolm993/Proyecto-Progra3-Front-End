import type { Event, EventFilters } from '../../types/event.types';

// Types específicos para el módulo de events
export interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  onViewDetails?: (eventId: string) => void;
}

export interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

export interface EventListProps {
  events: Event[];
  loading?: boolean;
  onRegister: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
}