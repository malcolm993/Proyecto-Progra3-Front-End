import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../../components';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', }}>
      <Card title="Iniciar Sesión" className="login-card">
        <form onSubmit={handleSubmit} style={{ width: '400px' }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="ej: organizador@empresa.com"
            required
           
          />
          
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />

          {error && (
            <div style={{ 
              color: '#dc3545', 
              padding: '8px 12px', 
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            size="large"
            loading={isLoading}
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            Iniciar Sesión
          </Button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          ¿No tienes cuenta? <Link to="/auth/register">Regístrate aquí</Link>
        </p>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          background: '#1d69b6ff', 
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <p><strong>Cuentas de prueba:</strong></p>
          <p>Organizador: organizador@test.com</p>
          <p>Participante: participante@test.com</p>
          <p><em>Cualquier contraseña funciona</em></p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;