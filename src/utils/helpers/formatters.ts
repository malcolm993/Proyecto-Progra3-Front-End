//Formateo de textos y numeros

/**
 * Recorta texto y agrega ellipsis si excede el límite
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Formatea un número como precio (para futuras funcionalidades)
 */
export const formatCurrency = (amount: number, currency: string = 'ARS'): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Capitaliza la primera letra de un texto
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convierte un string a slug (URL-friendly)
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Formatea un número grande con separadores de miles
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es-AR').format(number);
};