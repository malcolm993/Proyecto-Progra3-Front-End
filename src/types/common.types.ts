// Tipos que NO son de negocio, son UTILITARIOS
export interface SelectOption {
  value: string;
  label: string;      // ✅ Para dropdowns/selects
}

export interface BreadcrumbItem {
  title: string;
  path?: string;      // ✅ Para navegación
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;    // ✅ Parámetros de UI
  sortOrder?: 'asc' | 'desc';
}