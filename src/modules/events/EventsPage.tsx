import React from 'react';
import { Card, Button } from '../../components';
import { EventFilters, EventList } from './components';
import { useEvents } from './hooks';
import { useAuth } from '../../contexts/AuthContext';

const EventsPage: React.FC = () => {
  const {
    events,
    loading,
    error,
    filters,
    handleRegister,
    handleViewDetails,
    handleFiltersChange,
    handleClearFilters,
    refreshEvents
  } = useEvents();

  const { user } = useAuth();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#212529' }}>Eventos Disponibles</h1>
          <p style={{ margin: '4px 0 0 0', color: '#6c757d' }}>
            Descubre y participa en eventos de networking empresarial
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant="secondary"
            size="medium"
            onClick={refreshEvents}
            loading={loading}
          >
            🔄 Actualizar
          </Button>

          {user?.role === 'organizer' && (
            <Button
              variant="primary"
              size="medium"
              onClick={() => alert('Crear nuevo evento - Próximamente')}
            >
              ➕ Crear Evento
            </Button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Card style={{ 
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          marginBottom: '20px'
        }}>
          <div style={{ color: '#721c24', textAlign: 'center' }}>
            <strong>Error:</strong> {error}
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        {/* Sidebar - Filtros */}
        <div>
          <EventFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content - Lista de Eventos */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{ margin: 0, color: '#495057' }}>
              {events.length} evento{events.length !== 1 ? 's' : ''} encontrado{events.length !== 1 ? 's' : ''}
            </h3>
          </div>

          <EventList
            events={events}
            loading={loading}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;