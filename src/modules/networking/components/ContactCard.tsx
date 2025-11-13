import React from 'react';
import { Card, Button } from '../../../components';
import type { User } from '../../../types/user.types';

interface ContactCardProps {
  user: User;
  onContact: (userId: string) => void;
  similarity?: number;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  user, 
  onContact,
  similarity = 0 
}) => {
  const similarityPercentage = Math.round(similarity * 100);

  return (
    <Card style={{ textAlign: 'center' }}>
      {/* Avatar y nombre */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#1890ff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          margin: '0 auto 8px auto'
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h4 style={{ margin: '0 0 4px 0' }}>{user.name}</h4>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          {user.role === 'organizer' ? 'Organizador' : 'Participante'}
        </p>
      </div>

      {/* Información */}
      <div style={{ marginBottom: '12px', fontSize: '14px' }}>
        {user.company && (
          <p style={{ margin: '4px 0' }}>🏢 {user.company}</p>
        )}
        {user.industry && (
          <p style={{ margin: '4px 0' }}>📊 {user.industry}</p>
        )}
        {user.interests && user.interests.length > 0 && (
          <p style={{ margin: '4px 0' }}>
            🎯 {user.interests.slice(0, 2).join(', ')}
            {user.interests.length > 2 && '...'}
          </p>
        )}
      </div>

      {/* Score de similitud */}
      {similarity > 0 && (
        <div style={{
          backgroundColor: '#e6f7ff',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '12px',
          fontSize: '12px'
        }}>
          <strong>{similarityPercentage}%</strong> de compatibilidad
        </div>
      )}

      {/* Botón de contacto */}
      <Button
        variant="primary"
        size="small"
        onClick={() => onContact(user.id)}
        style={{ width: '100%' }}
      >
        👋 Contactar
      </Button>
    </Card>
  );
};