import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
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
      <Link to="/" style={{ 
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
              to="/events" 
              style={{ 
                color: isActiveRoute('/events') ? '#1890ff' : 'white', 
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: isActiveRoute('/events') ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
              }}
            >
              Eventos
            </Link>
            
            <Link 
              to="/profile" 
              style={{ 
                color: isActiveRoute('/profile') ? '#1890ff' : 'white', 
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: isActiveRoute('/profile') ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
              }}
            >
              Perfil
            </Link>
            
            {user?.role === 'organizer' && (
              <Link 
                to="/admin" 
                style={{ 
                  color: isActiveRoute('/admin') ? '#1890ff' : 'white', 
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: isActiveRoute('/admin') ? 'rgba(24, 144, 255, 0.1)' : 'transparent'
                }}
              >
                Admin
              </Link>
            )}
            
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
              to="/auth/login" 
              style={{ 
                color: isActiveRoute('/auth/login') ? '#1890ff' : 'white', 
                textDecoration: 'none' 
              }}
            >
              Ingresar
            </Link>
            <Button 
              variant="primary" 
              size="small"
              onClick={() => navigate('/auth/register')}
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