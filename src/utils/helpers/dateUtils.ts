//Formateo de fechas y horas

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires'
  };
  
  return new Date(date).toLocaleDateString('es-AR', { ...defaultOptions, ...options });
};

/**
 * Formatea una hora para mostrar al usuario
 */
export const formatTime = (date: Date | string): string => {
  return new Date(date).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires'
  });
};

/**
 * Formatea fecha y hora completas
 */
export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} a las ${formatTime(date)}`;
};

/**
 * Verifica si una fecha es futura
 */
export const isFutureDate = (date: Date | string): boolean => {
  return new Date(date) > new Date();
};

/**
 * Calcula la diferencia en días entre dos fechas
 */
export const daysBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Agrega días a una fecha
 */
export const addDays = (date: Date | string, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};