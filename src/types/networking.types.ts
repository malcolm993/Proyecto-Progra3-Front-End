// La plataforma de networking tiene funcionalidades ESPECÍFICAS:
// - Sugerencias de conexión
// - Solicitudes de contacto  
// - Mensajería entre participantes
// - Sistema de matches por intereses

export interface ContactRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';  // ✅ Estados específicos
  createdAt: Date;
}

export interface Suggestion {
  userId: string;
  score: number;                    // ✅ Algoritmo de scoring
  reasons: string[];               // ✅ Por qué se sugiere esta conexión
}