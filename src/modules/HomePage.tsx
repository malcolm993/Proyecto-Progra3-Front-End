import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎯 Plataforma de Networking Empresarial</h1>
      <p>Conecta con profesionales y participa en eventos exclusivos</p>
      
      {isAuthenticated ? (
        <div>
          <h2>¡Bienvenido, {user?.name}!</h2>
          <p>Rol: {user?.role === 'organizer' ? 'Organizador' : 'Participante'}</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/events" style={{ margin: '10px', padding: '10px 20px', background: '#1890ff', color: 'white', textDecoration: 'none' }}>
              Ver Eventos
            </Link>
            <Link to="/profile" style={{ margin: '10px', padding: '10px 20px', background: '#52c41a', color: 'white', textDecoration: 'none' }}>
              Mi Perfil
            </Link>
            {user?.role === 'organizer' && (
              <Link to="/admin" style={{ margin: '10px', padding: '10px 20px', background: '#faad14', color: 'white', textDecoration: 'none' }}>
                Panel Admin
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Únete a nuestra comunidad</h2>
          <div style={{ marginTop: '20px' }}>
            <Link to="/auth/login" style={{ margin: '10px', padding: '10px 20px', background: '#1890ff', color: 'white', textDecoration: 'none' }}>
              Iniciar Sesión
            </Link>
            <Link to="/auth/register" style={{ margin: '10px', padding: '10px 20px', background: '#52c41a', color: 'white', textDecoration: 'none' }}>
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;