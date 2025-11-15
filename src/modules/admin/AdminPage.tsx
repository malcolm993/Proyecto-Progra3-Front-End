import React, { useState } from 'react';
import { Card, Button, Loader } from '../../components';
import { useAdmin } from './hooks';
import { DashboardStats, EventManagement, AttendeesList } from './components';
import { useAuth } from '../../contexts/AuthContext';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { stats, organizerEvents, loading, error, exportAttendees, refreshData } = useAdmin();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'attendees'>('dashboard');
  const [selectedEventForAttendees, setSelectedEventForAttendees] = useState<string>('1');

  if (!user || user.role !== 'organizer') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder al panel de administración.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <Loader text="Cargando panel de administración..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Card style={{ 
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#721c24' }}>Error</h3>
          <p style={{ color: '#721c24' }}>{error}</p>
          <Button variant="primary" onClick={refreshData}>
            Reintentar
          </Button>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: '📊' },
    { id: 'events' as const, label: 'Mis Eventos', icon: '📅' },
    { id: 'attendees' as const, label: 'Asistentes', icon: '👥' }
  ];

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
          <h1 style={{ margin: 0, color: '#212529' }}>Panel de Administración</h1>
          <p style={{ margin: '4px 0 0 0', color: '#6c757d' }}>
            Gestiona tus eventos y participantes
          </p>
        </div>
        
        <Button
          variant="primary"
          size="medium"
          onClick={() => alert('Crear nuevo evento - Próximamente')}
        >
          ➕ Nuevo Evento
        </Button>
      </div>

      {/* Navigation Tabs */}
      <Card style={{ marginBottom: '24px', padding: '0' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e8e8e8' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#1890ff' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      <div>
        {activeTab === 'dashboard' && stats && (
          <DashboardStats stats={stats} />
        )}

        {activeTab === 'events' && (
          <EventManagement
            events={organizerEvents}
            onExportAttendees={exportAttendees}
          />
        )}

        {activeTab === 'attendees' && (
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
            {/* Event Selector */}
            <Card title="Seleccionar Evento">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {organizerEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventForAttendees(event.id)}
                    style={{
                      padding: '12px',
                      border: selectedEventForAttendees === event.id 
                        ? '2px solid #1890ff' 
                        : '1px solid #e8e8e8',
                      backgroundColor: selectedEventForAttendees === event.id 
                        ? '#e6f7ff' 
                        : 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {event.attendees.length} asistentes
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Attendees List */}
            <AttendeesList eventId={selectedEventForAttendees} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;