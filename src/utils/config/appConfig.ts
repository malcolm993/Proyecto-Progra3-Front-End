// Rutas de la aplicación - centralizadas para evitar "string magic"
// Configuración que puede cambiar entre entornos (dev, prod, test)

export const ENV_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },
  
  // App Configuration  
  APP: {
    NAME: import.meta.env.VITE_APP_NAME || 'Networking Platform',
    VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    ENV: import.meta.env.MODE || 'development',
  },
  
  // Features flags
  FEATURES: {
    REGISTRATION: import.meta.env.VITE_FEATURE_REGISTRATION !== 'false',
    NETWORKING: import.meta.env.VITE_FEATURE_NETWORKING !== 'false',
    EXPORT: import.meta.env.VITE_FEATURE_EXPORT !== 'false',
  }
} as const;

// Tipo para TypeScript
export type AppEnvironment = 'development' | 'production' | 'test';