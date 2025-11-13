import React from 'react';
import { Card, Grid, } from '../../components/ui';
import { Button } from '../../components/common';
import { Loader } from '../../components/common';
import { ContactCard } from './components/ContactCard';
import { useNetworking } from './hooks/useNetworking';

const NetworkingPage: React.FC = () => {
  const { suggestedUsers, loading, handleContact, refreshSuggestions } = useNetworking();

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
          <h1 style={{ margin: 0, color: '#212529' }}>Networking</h1>
          <p style={{ margin: '4px 0 0 0', color: '#6c757d' }}>
            Conecta con profesionales afines a tus intereses
          </p>
        </div>

        <Button
          variant="secondary"
          size="medium"
          onClick={refreshSuggestions}
          loading={loading}
        >
          🔄 Actualizar Sugerencias
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{ marginBottom: '24px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {suggestedUsers.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>Contactos Sugeridos</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {suggestedUsers.filter(u => u.industry).length}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>Misma Industria</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                {suggestedUsers.length * 3}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>Intereses en Común</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de contactos sugeridos */}
      <Card title="Contactos Sugeridos para Ti">
        {loading ? (
          <Loader text="Buscando profesionales afines..." />
        ) : suggestedUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
            <h3>No hay sugerencias disponibles</h3>
            <p>Completa tu perfil para obtener mejores recomendaciones</p>
          </div>
        ) : (
          <Grid columns={4} gap={20}>
            {suggestedUsers.map((user) => (
              <ContactCard
                key={user.id}
                user={user}
                onContact={handleContact}
              />
            ))}
          </Grid>
        )}
      </Card>

      {/* Información adicional */}
      <Card 
        title="💡 Cómo funciona el Networking" 
        style={{ marginTop: '24px' }}
      >
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>Nuestro sistema sugiere contactos basado en:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>📊 <strong>Industria en común</strong></li>
            <li>🎯 <strong>Intereses similares</strong></li>
            <li>🤝 <strong>Participación en mismos eventos</strong></li>
          </ul>
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#6c757d' }}>
            Al contactar a un usuario, podrás enviarle mensajes directos y coordinar encuentros.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NetworkingPage;