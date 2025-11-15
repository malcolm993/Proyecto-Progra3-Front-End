import React, { useState, useEffect } from 'react';
import { Card, Button, Loader } from '../../../components';
import { adminService } from '../services';

interface AttendeesListProps {
  eventId?: string;
}

export const AttendeesList: React.FC<AttendeesListProps> = ({ eventId }) => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(eventId);

  useEffect(() => {
    if(eventId && eventId !== selectedEvent) {
      setSelectedEvent(eventId);
    }
  }, [eventId]);

  const loadAttendees = async (eventId: string) => {
    try {
      setLoading(true);
      const attendeesData = await adminService.getEventAttendees(eventId);
      setAttendees(attendeesData);
    } catch (error) {
      console.error('Error loading attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      loadAttendees(selectedEvent);
    }
  }, [selectedEvent]);

  if (!selectedEvent) {
    return (
      <Card title="Lista de Asistentes">
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          <p>Selecciona un evento para ver sus asistentes</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Lista de Asistentes">
      {loading ? (
        <Loader text="Cargando asistentes..." />
      ) : (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6c757d' }}>
              {attendees.length} asistentes registrados
            </span>
            <Button
              variant="primary"
              size="small"
              onClick={() => selectedEvent && adminService.exportAttendees(selectedEvent, 'csv')}
            >
              📥 Exportar Lista
            </Button>
          </div>

          {attendees.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#6c757d' }}>
              No hay asistentes registrados para este evento
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f56f16ff' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Nombre</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Empresa</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Fecha Registro</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee) => (
                    <tr key={attendee.id} style={{ borderBottom: '1px solid #e99517ff' }}>
                      <td style={{ padding: '12px' }}>{attendee.user?.name || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{attendee.user?.email || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{attendee.user?.company || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        {new Date(attendee.registrationDate).toLocaleDateString('es-ES')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: attendee.status === 'confirmed' ? '#d4edda' : '#fff3cd',
                          color: attendee.status === 'confirmed' ? '#155724' : '#856404'
                        }}>
                          {attendee.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};