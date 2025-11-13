import React, { useState } from 'react';
import { Card, Button, Input } from '../../../components';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../types/user.types';

interface ProfileFormProps {
  user: User;
  onUpdate: (userData: Partial<User>) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    company: user.company || '',
    industry: user.industry || '',
    interests: user.interests?.join(', ') || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await onUpdate({
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i)
      });
      setMessage('Perfil actualizado exitosamente!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card title="Editar Perfil">
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <Input
          label="Nombre completo"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          required
        />

        <Input
          label="Empresa"
          value={formData.company}
          onChange={(value) => handleChange('company', value)}
          placeholder="Nombre de tu empresa"
        />

        <Input
          label="Industria"
          value={formData.industry}
          onChange={(value) => handleChange('industry', value)}
          placeholder="Ej: Tecnología, Marketing, Salud..."
        />

        <Input
          label="Intereses"
          value={formData.interests}
          onChange={(value) => handleChange('interests', value)}
          placeholder="Separados por coma. Ej: networking, tecnología, emprendimiento"
        />

        {message && (
          <div style={{
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: message.includes('Error') ? '#f8d7da' : '#d1edff',
            color: message.includes('Error') ? '#721c24' : '#004085',
            marginBottom: '16px'
          }}>
            {message}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          style={{ width: '100%' }}
        >
          Actualizar Perfil
        </Button>
      </form>
    </Card>
  );
};