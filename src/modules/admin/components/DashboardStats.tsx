import React from 'react';
import { Card } from '../../../components';
import type { AdminStats } from '../types';

interface DashboardStatsProps {
  stats: AdminStats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Eventos',
      value: stats.totalEvents.toString(),
      icon: '📅',
      color: '#1890ff',
      description: 'Eventos creados'
    },
    {
      title: 'Total Participantes',
      value: stats.totalParticipants.toString(),
      icon: '👥',
      color: '#52c41a',
      description: 'Inscripciones totales'
    },
    {
      title: 'Próximos Eventos',
      value: stats.upcomingEvents.toString(),
      icon: '⏰',
      color: '#faad14',
      description: 'Eventos programados'
    },
    {
      title: 'Asistencia Promedio',
      value: `${stats.averageAttendance}%`,
      icon: '📊',
      color: '#722ed1',
      description: 'Tasa de participación'
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '16px', color: '#212529' }}>Dashboard</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {statCards.map((stat, index) => (
          <Card key={index} style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>
              {stat.icon}
            </div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold',
              color: stat.color,
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#212529',
              marginBottom: '4px'
            }}>
              {stat.title}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6c757d'
            }}>
              {stat.description}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};