import React, { useState } from 'react';
import { Card, Button, Grid } from '../../../components';
import type { EventWithAttendees } from '../types';

interface EventManagementProps {
  events: EventWithAttendees[];
  onExportAttendees: (eventId: string, format: 'csv' | 'pdf') => void;
}

export const EventManagement: React.FC<EventManagementProps> = ({
  events,
  onExportAttendees
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  const getEventTypeLabel = (type: string) => {
    const types = {
      talk: '🎤 Charla',
      fair: '🏢 Feria', 
      business_round: '🤝 Ronda de Negocios'
    };
    return types[type as keyof typeof types] || type;
  };

  if (events.length === 0) {
    return (
      <Card title="Mis Eventos">
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          <h3>No tienes eventos creados</h3>
          <p>Crea tu primer evento para comenzar</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Gestión de Eventos">
      <Grid columns={1} gap={16}>
        {events.map((event) => (
          <Card key={event.id} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#212529' }}>
                  {event.title}
                </h4>
                <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
                  <span style={{ marginRight: '12px' }}>
                    {getEventTypeLabel(event.type)}
                  </span>
                  <span style={{ marginRight: '12px' }}>
                    📅 {formatDate(event.date)}
                  </span>
                  <span>
                    👥 {event.attendees.length} asistentes
                  </span>
                </div>
                <p style={{ margin: 0, color: '#495057', fontSize: '14px' }}>
                  {event.description}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => onExportAttendees(event.id, 'csv')}
                >
                  📥 Exportar CSV
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => onExportAttendees(event.id, 'pdf')}
                >
                  📥 Exportar PDF
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => alert(`Editando evento: ${event.id}`)}
                >
                  ✏️ Editar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </Card>
  );
};