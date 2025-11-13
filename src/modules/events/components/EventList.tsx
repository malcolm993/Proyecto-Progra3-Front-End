import React from 'react';
import { Grid, Loader } from '../../../components';
import type { Event } from '../../../types/event.types';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  loading?: boolean;
  onRegister: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  loading = false,
  onRegister,
  onViewDetails
}) => {
  if (loading) {
    return <Loader text="Cargando eventos..." />;
  }

  if (events.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        color: '#6c757d'
      }}>
        <h3>No se encontraron eventos</h3>
        <p>Intenta ajustar los filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <Grid columns={3} gap={20}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
          onViewDetails={onViewDetails}
        />
      ))}
    </Grid>
  );
};
