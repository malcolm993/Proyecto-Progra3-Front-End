//valores que permanecen constantes 
export const ROUTES = {
  // Públicas
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  
  // Protegidas
  EVENTS: '/events',
  PROFILE: '/profile', 
  NETWORKING: '/networking',
  ADMIN: '/admin',
  
  // API (para futura integración)
  API: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      ME: '/auth/me'
    },
    EVENTS: '/events',
    USERS: '/users',
    REGISTRATIONS: '/registrations'
  }
} as const;

// Tipo para TypeScript autocompletion
export type AppRoute = keyof typeof ROUTES;