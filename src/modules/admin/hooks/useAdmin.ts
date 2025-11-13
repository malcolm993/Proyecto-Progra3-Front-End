import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { adminService } from '../services';
import type { AdminStats, EventWithAttendees } from '../types';

export const useAdmin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [organizerEvents, setOrganizerEvents] = useState<EventWithAttendees[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdminData = async () => {
    if (!user || user.role !== 'organizer') return;

    try {
      setLoading(true);
      setError(null);

      // Cargar estadísticas y eventos en paralelo
      const [statsData, eventsData] = await Promise.all([
        adminService.getAdminStats(user.id),
        adminService.getOrganizerEvents(user.id)
      ]);

      setStats(statsData);
      setOrganizerEvents(eventsData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos de administración');
    } finally {
      setLoading(false);
    }
  };

  const exportAttendees = async (eventId: string, format: 'csv' | 'pdf' = 'csv') => {
    try {
      const fileName = await adminService.exportAttendees(eventId, format);
      alert(`Archivo generado: ${fileName}\n\nEn un sistema real, se descargaría automáticamente.`);
      return fileName;
    } catch (err: any) {
      alert(`Error al exportar: ${err.message}`);
      throw err;
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      const newEvent = await adminService.createEvent(eventData);
      await loadAdminData(); // Recargar datos
      return newEvent;
    } catch (err: any) {
      alert(`Error al crear evento: ${err.message}`);
      throw err;
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [user]);

  return {
    stats,
    organizerEvents,
    loading,
    error,
    exportAttendees,
    createEvent,
    refreshData: loadAdminData
  };
};