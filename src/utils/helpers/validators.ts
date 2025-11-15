//validacion de datos 

// Utilidades para validación de datos - consistente en toda la app
import { APP_CONFIG } from '../constants/app';

/**
 * Valida un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= APP_CONFIG.VALIDATION.USER.MAX_EMAIL_LENGTH;
};

/**
 * Valida una contraseña
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= APP_CONFIG.VALIDATION.USER.MIN_PASSWORD_LENGTH;
};

/**
 * Valida un nombre
 */
export const isValidName = (name: string): boolean => {
  return name.length > 0 && name.length <= APP_CONFIG.VALIDATION.USER.MAX_NAME_LENGTH;
};

/**
 * Valida un título de evento
 */
export const isValidEventTitle = (title: string): boolean => {
  return title.length > 0 && title.length <= APP_CONFIG.VALIDATION.EVENT.MAX_TITLE_LENGTH;
};

/**
 * Valida que un array de tags no exceda el límite
 */
export const isValidTags = (tags: string[]): boolean => {
  return tags.length <= APP_CONFIG.VALIDATION.EVENT.MAX_TAGS;
};

/**
 * Valida que una fecha sea futura
 */
export const isValidEventDate = (date: Date | string): boolean => {
  return new Date(date) > new Date();
};

/**
 * Valida que el endTime sea después del startTime
 */
export const isValidTimeRange = (startTime: Date | string, endTime: Date | string): boolean => {
  return new Date(endTime) > new Date(startTime);
};