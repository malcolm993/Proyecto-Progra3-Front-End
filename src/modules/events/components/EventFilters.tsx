import React from 'react';
import { Card, Button } from '../../../components';
import type { EventFilters as EventFiltersType } from '../../../types/event.types';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  onClearFilters: () => void;
}
export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const eventTypes = [
    { value: '', label: 'Todos los tipos' },
    { value: 'talk', label: '🎤 Charlas' },
    { value: 'fair', label: '🏢 Ferias' },
    { value: 'business_round', label: '🤝 Rondas de Negocios' }
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== ''
  );

  return (
    <Card title="Filtros de Eventos">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Filtro por tipo */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontWeight: '500',
            fontSize: '14px'
          }}>
            Tipo de Evento
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              type: e.target.value as any || undefined 
            })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por búsqueda */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontWeight: '500',
            fontSize: '14px'
          }}>
            Buscar
          </label>
          <input
            type="text"
            value={filters.query || ''}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              query: e.target.value || undefined 
            })}
            placeholder="Buscar por título, descripción o tags..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="secondary"
            size="small"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            style={{ flex: 1 }}
          >
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </Card>
  );
};
