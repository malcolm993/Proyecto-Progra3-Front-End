import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../types/user.types';

// Mock data - usuarios para networking
const mockUsers: User[] = [
  {
    id: '101',
    name: 'Ana García',
    email: 'ana@tech.com',
    role: 'participant',
    company: 'Innovation Labs',
    industry: 'Tecnología',
    interests: ['AI', 'startups', 'innovación'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '102', 
    name: 'Carlos Rodríguez',
    email: 'carlos@marketing.com',
    role: 'participant',
    company: 'Digital Solutions',
    industry: 'Marketing',
    interests: ['redes sociales', 'branding', 'growth'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '103',
    name: 'María López',
    email: 'maria@consulting.com', 
    role: 'organizer',
    company: 'Business Consultants',
    industry: 'Consultoría',
    interests: ['estrategia', 'liderazgo', 'management'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const useNetworking = () => {
  const { user: currentUser } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular cálculo de compatibilidad
  const calculateSimilarity = (user1: User, user2: User): number => {
    let score = 0;
    
    // Misma industria
    if (user1.industry && user2.industry && user1.industry === user2.industry) {
      score += 0.4;
    }
    
    // Intereses en común
    const commonInterests = user1.interests?.filter(interest => 
      user2.interests?.includes(interest)
    ).length || 0;
    
    score += commonInterests * 0.2;
    
    return Math.min(score, 1);
  };

  const loadSuggestedUsers = async () => {
    try {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) return;

      // Calcular compatibilidad y ordenar
      const usersWithSimilarity = mockUsers
        .filter(user => user.id !== currentUser.id)
        .map(user => ({
          user,
          similarity: calculateSimilarity(currentUser, user)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .map(item => item.user);

      setSuggestedUsers(usersWithSimilarity);
    } catch (error) {
      console.error('Error loading suggested users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (userId: string) => {
    // TODO: Implementar sistema de mensajes
    alert(`Solicitud de contacto enviada a usuario ${userId}`);
  };

  useEffect(() => {
    loadSuggestedUsers();
  }, [currentUser]);

  return {
    suggestedUsers,
    loading,
    handleContact,
    refreshSuggestions: loadSuggestedUsers
  };
};