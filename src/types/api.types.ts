// Tipos relacionados con la COMUNICACIÓN, no con el negocio
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;  // ✅ 200, 404, 500 - HTTP status
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;       // ✅ Parámetros de paginación
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;        // ✅ Códigos de error técnicos
  details?: any;
}