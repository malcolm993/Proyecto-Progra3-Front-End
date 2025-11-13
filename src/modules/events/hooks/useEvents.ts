import { useState, useEffect } from 'react';
import { eventsService } from '../../../services/events';
import type { Event, EventFilters } from '../../../types/event.types';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({});

  // Cargar eventos
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsService.getEvents(filters);
      
      if (response.success) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...events];

      if (filters.type) {
        filtered = filtered.filter(event => event.type === filters.type);
      }

      if (filters.query) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags.some(tag => tag.toLowerCase().includes(query)) ||
          event.speaker.toLowerCase().includes(query)
        );
      }

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [events, filters]);

  // Cargar eventos al montar el componente
  useEffect(() => {
    loadEvents();
  }, []);

  // Manejar registro a evento
  const handleRegister = async (eventId: string) => {
    try {
      // TODO: Implementar registro real
      console.log('Registrando al evento:', eventId);
      alert(`Te has registrado exitosamente al evento ${eventId}`);
      
      // Recargar eventos para actualizar contadores
      await loadEvents();
    } catch (err: any) {
      alert(`Error al registrarse: ${err.message}`);
    }
  };

  // Manejar ver detalles
  const handleViewDetails = (eventId: string) => {
    // TODO: Navegar a página de detalles
    console.log('Ver detalles del evento:', eventId);
    alert(`Mostrando detalles del evento ${eventId}`);
  };

  // Manejar cambio de filtros
  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({});
  };

  return {
    events: filteredEvents,
    loading,
    error,
    filters,
    handleRegister,
    handleViewDetails,
    handleFiltersChange,
    handleClearFilters,
    refreshEvents: loadEvents
  };
};