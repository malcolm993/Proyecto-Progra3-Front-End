import React from 'react';
import { Card, Button } from '../../../components';
import type { Event } from '../../../types/event.types';
import { useAuth } from '../../../contexts/AuthContext';

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onRegister, 
  onViewDetails 
}) => {
  const { user, isAuthenticated } = useAuth();

  const isFull = event.maxParticipants && event.currentParticipants >= event.maxParticipants;
  const isUserRegistered = false; // TODO: Implementar verificación

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeLabel = (type: string) => {
    const types = {
      talk: '🎤 Charla',
      fair: '🏢 Feria',
      business_round: '🤝 Ronda de Negocios'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <Card
      style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header con tipo de evento */}
      <div style={{ 
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      }}>
        <span style={{ 
          fontSize: '12px',
          fontWeight: '600',
          color: '#495057',
          textTransform: 'uppercase'
        }}>
          {getEventTypeLabel(event.type)}
        </span>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, padding: '16px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#212529'
        }}>
          {event.title}
        </h3>

        <p style={{ 
          margin: '0 0 12px 0',
          color: '#6c757d',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {event.description.length > 120 
            ? `${event.description.substring(0, 120)}...` 
            : event.description
          }
        </p>

        {/* Información del evento */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: '#495057' }}>
              📅 {formatDate(event.date)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: '#495057' }}>
              ⏰ {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px', color: '#495057' }}>
              📍 {event.location}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#495057' }}>
              🎤 {event.speaker}
              {event.speakerCompany && ` - ${event.speakerCompany}`}
            </span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#e9ecef',
                  color: '#495057',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginRight: '4px',
                  marginBottom: '4px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Participantes */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <span>
            👥 {event.currentParticipants} 
            {event.maxParticipants && ` / ${event.maxParticipants}`} participantes
          </span>
          {isFull && (
            <span style={{ color: '#dc3545', fontWeight: '600' }}>
              🔒 COMPLETO
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div style={{ 
        padding: '12px 16px',
        borderTop: '1px solid #e9ecef',
        display: 'flex',
        gap: '8px'
      }}>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onViewDetails(event.id)}
          style={{ flex: 1 }}
        >
          Ver Detalles
        </Button>
        
        {isAuthenticated && user?.role === 'participant' && (
          <Button
            variant={isUserRegistered ? "success" : "primary"}
            size="small"
            onClick={() => onRegister(event.id)}
            disabled={isFull || isUserRegistered}
            style={{ flex: 1 }}
          >
            {isUserRegistered ? 'Inscrito ✓' : 'Inscribirse'}
          </Button>
        )}
      </div>
    </Card>
  );
};
