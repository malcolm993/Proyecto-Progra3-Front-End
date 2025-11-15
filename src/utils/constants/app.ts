//configuracion general de la aplicacion

// Configuración general de la aplicación
export const APP_CONFIG = {
  // Información de la app
  NAME: 'Networking & INSPTech Events',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma de eventos de networking empresarial',
  
  // Paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZES: [10, 25, 50, 100] as const
  },
  
  // Validación
  VALIDATION: {
    USER: {
      MAX_NAME_LENGTH: 100,
      MIN_PASSWORD_LENGTH: 6,
      MAX_EMAIL_LENGTH: 255
    },
    EVENT: {
      MAX_TITLE_LENGTH: 100,
      MAX_DESCRIPTION_LENGTH: 1000,
      MAX_LOCATION_LENGTH: 255,
      MAX_SPEAKER_LENGTH: 2,
      MAX_TAGS: 10
    }
  },
  
  // Tiempos y delays
  TIMING: {
    API_TIMEOUT: 10000, // 10 segundos
    DEBOUNCE_DELAY: 300, // 300ms para búsquedas
    TOAST_DURATION: 5000 // 5 segundos para notificaciones
  }
} as const;

// Tipo para TypeScript
export type PageSize = typeof APP_CONFIG.PAGINATION.PAGE_SIZES[number];