import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const TestAuth: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  const handleTestLogin = async () => {
    try {
      await login({
        email: 'organizador@test.com',
        password: 'password123'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Test AuthContext</h3>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {user ? user.name : 'None'}</p>
      <p>Role: {user ? user.role : 'None'}</p>
      {user ? (
        <div>
          <h4>All user data:</h4>
          <pre style={{ background: 'red', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      ) : null}
      <p></p>
      {!isAuthenticated ? (
        <button onClick={handleTestLogin}>Test Login (Organizador o Participante)</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default TestAuth;