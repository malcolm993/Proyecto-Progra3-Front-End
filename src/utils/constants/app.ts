// Configuración general de la aplicación - VERSIÓN SEGURA
export const APP_CONFIG = {
  // Información de la app (EXISTENTE)
  NAME: 'Networking & INSPTech Events',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma de eventos de networking empresarial',
  
  // 🔥 NUEVO pero COMPATIBLE - No rompe código existente
  ROLES: {
    PARTICIPANT: 'participant',
    ORGANIZER: 'organizer',
    ADMIN: 'admin',
  } as const,
  
  EVENT_TYPES: {
    TALK: 'talk',
    FAIR: 'fair', 
    BUSINESS_ROUND: 'business_round',
    NETWORKING: 'networking',
  } as const,
  
  INTERESTS: {
    TECHNOLOGY: 'technology',
    BUSINESS: 'business',
    MARKETING: 'marketing',
    FINANCE: 'finance',
    HEALTHCARE: 'healthcare',
    EDUCATION: 'education',
    OTHER: 'other',
  } as const,

  // EXISTENTE - sin cambios
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZES: [10, 25, 50, 100] as const
  },
  
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
      MAX_SPEAKERS: 10, // 🔥 Corregido
      MAX_TAGS: 10
    }
  },
  
  TIMING: {
    API_TIMEOUT: 10000,
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 5000
  }
} as const;

// Tipos NUEVOS - No afectan código existente
export type UserRole = typeof APP_CONFIG.ROLES[keyof typeof APP_CONFIG.ROLES];
export type EventType = typeof APP_CONFIG.EVENT_TYPES[keyof typeof APP_CONFIG.EVENT_TYPES];
export type InterestCategory = typeof APP_CONFIG.INTERESTS[keyof typeof APP_CONFIG.INTERESTS];
export type PageSize = typeof APP_CONFIG.PAGINATION.PAGE_SIZES[number]; // EXISTENTE