import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common';
import { ROUTES } from '../../utils/constants/routes';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      background: '#001529',
      color: 'white',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    }}>
      <Link to={ROUTES.HOME} style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        🎯 Networking Platform
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {isAuthenticated ? (
          <>
            <Link
              to={ROUTES.EVENTS}
              style={{
                color: isActiveRoute(ROUTES.EVENTS) ? '#1890ff' : 'white',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: isActiveRoute(ROUTES.EVENTS) ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
              }}
            >
              Eventos
            </Link>

            <Link
              to={ROUTES.PROFILE}
              style={{
                color: isActiveRoute(ROUTES.PROFILE) ? '#1890ff' : 'white',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: isActiveRoute(ROUTES.PROFILE) ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
              }}
            >
              Perfil
            </Link>

            {(user?.role === 'organizer' || user?.role === 'admin') && (
              <Link
                to={ROUTES.ADMIN.DASHBOARD}
                style={{
                  color: isActiveRoute(ROUTES.ADMIN.DASHBOARD) ? '#1890ff' : 'white',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: isActiveRoute(ROUTES.ADMIN.DASHBOARD) ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
                }}
              >
                Admin
              </Link>
            )}

            <Link
              to={ROUTES.NETWORKING}
              style={{
                color: isActiveRoute(ROUTES.NETWORKING) ? '#1890ff' : 'white',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: isActiveRoute(ROUTES.NETWORKING) ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
              }}
            >
              Networking
            </Link>

            <span style={{ color: '#ccc' }}>Hola, {user?.name}</span>

            <Button
              variant="secondary"
              size="small"
              onClick={handleLogout}
            >
              Salir
            </Button>
          </>
        ) : (
          <>
            <Link
              to={ROUTES.LOGIN}
              style={{
                color: isActiveRoute(ROUTES.LOGIN) ? '#1890ff' : 'white',
                textDecoration: 'none'
              }}
            >
              Ingresar
            </Link>
            <Button
              variant="primary"
              size="small"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Registrarse
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;