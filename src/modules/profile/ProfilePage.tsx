import React from 'react';
import { Card, Grid } from '../../components/ui';
import { Button } from '../../components/common';
import { ProfileForm } from './components';
import { useProfile } from './hooks';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { updateProfile, loading } = useProfile();

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  const stats = [
    { label: 'Eventos Inscritos', value: '3', icon: '🎯' },
    { label: 'Contactos', value: '12', icon: '👥' },
    { label: 'Eventos Creados', value: user.role === 'organizer' ? '5' : '0', icon: '📅' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#212529' }}>Mi Perfil</h1>
          <p style={{ margin: '4px 0 0 0', color: '#6c757d' }}>
            Gestiona tu información personal y preferencias
          </p>
        </div>
        
        <Button
          variant="danger"
          size="medium"
          onClick={logout}
        >
          Cerrar Sesión
        </Button>
      </div>

      <Grid columns={2} gap={24}>
        {/* Columna izquierda - Información actual */}
        <div>
          <Card title="Información Actual">
            <div style={{ lineHeight: '1.8' }}>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role === 'organizer' ? 'Organizador' : 'Participante'}</p>
              <p><strong>Empresa:</strong> {user.company || 'No especificada'}</p>
              <p><strong>Industria:</strong> {user.industry || 'No especificada'}</p>
              <p><strong>Intereses:</strong> {user.interests?.join(', ') || 'No especificados'}</p>
              <p><strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
          </Card>

          {/* Stats Card */}
          <Card title="Mis Estadísticas" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              {stats.map((stat, index) => (
                <div key={index}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Columna derecha - Formulario de edición */}
        <div>
          <ProfileForm user={user} onUpdate={updateProfile} />
        </div>
      </Grid>
    </div>
  );
};

export default ProfilePage;