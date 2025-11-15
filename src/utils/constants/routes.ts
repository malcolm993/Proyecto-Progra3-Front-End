// Rutas de la aplicación - centralizadas para evitar "string magic"
export const ROUTES = {
  // Públicas
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  // Protegidas
  EVENTS: '/events',
  PROFILE: '/profile',
  NETWORKING: '/networking',
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    EVENTS: '/admin/events',
    REPORT: '/admin/reports' 
  },

  // API (para futura integración) - CONVENCIONES REST ESTÁNDAR
  API: {
    AUTH: {
      LOGIN: '/auth/login',                // POST
      REGISTER: '/auth/register',          // POST
      LOGOUT: '/auth/logout',              // POST
      ME: '/auth/me',                      // GET
      REFRESH: '/auth/refresh'             // POST
    },
    
    EVENTS: {
      BASE: '/events',                     // GET(listar), POST(crear)
      BY_ID: (eventId: string) => `/events/${eventId}`, // GET(detalles), PUT(actualizar), DELETE(eliminar)
      REGISTER: (eventId: string) => `/events/${eventId}/register`, // POST - Registrarse a evento
      ATTENDEES: (eventId: string) => `/events/${eventId}/attendees`, // GET - Lista de asistentes
      MY_EVENTS: '/events/my-events',      // GET - Mis eventos (como organizador)
      MY_REGISTRATIONS: '/events/my-registrations' // GET - Eventos donde estoy registrado
    },
    
    USERS: {
      BASE: '/users',                      // GET - Listar usuarios (admin)
      PROFILE: '/users/profile',           // GET(ver), PUT(actualizar)
      CONNECTIONS: '/users/connections',   // GET(listar), POST(agregar)
      SUGGESTIONS: '/users/suggestions',   // GET - Sugerencias de conexión
      BY_ID: (userId: string) => `/users/${userId}` // GET - Perfil público de usuario
    },

    REGISTRATIONS: {
      BASE: '/registrations',              // POST - Crear registro
      BY_ID: (registrationId: string) => `/registrations/${registrationId}`, // GET/PUT/DELETE
      BY_EVENT: (eventId: string) => `/events/${eventId}/registrations`, // GET - Registros por evento
      MY_REGISTRATIONS: '/registrations/my-registrations' // GET - Mis registros activos
    },

    ERROR: {
      NOT_FOUND: '/404',
      UNAUTHORIZED: '/401' 
    }
  }
} as const;

// Tipo para TypeScript autocompletion
export type AppRoute = keyof typeof ROUTES;
export type ApiRoute = keyof typeof ROUTES.API;