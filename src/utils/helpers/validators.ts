import { APP_CONFIG } from '../constants/app';

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= APP_CONFIG.VALIDATION.USER.MAX_EMAIL_LENGTH;
  },
  
  password: (password: string): { isValid: boolean; message?: string } => {
    if (password.length < APP_CONFIG.VALIDATION.USER.MIN_PASSWORD_LENGTH) {
      return { 
        isValid: false, 
        message: `La contraseña debe tener al menos ${APP_CONFIG.VALIDATION.USER.MIN_PASSWORD_LENGTH} caracteres` 
      };
    }
    return { isValid: true };
  },
  
  eventTitle: (title: string): boolean => {
    return title.length > 0 && title.length <= APP_CONFIG.VALIDATION.EVENT.MAX_TITLE_LENGTH;
  },
  
  eventDescription: (description: string): boolean => {
    return description.length > 0 && description.length <= APP_CONFIG.VALIDATION.EVENT.MAX_DESCRIPTION_LENGTH;
  },

  isValidEventType: (type: string): boolean => {
    return Object.values(APP_CONFIG.EVENT_TYPES).includes(type as any);
  },


  isValidUserRole: (role: string): boolean => {
    return Object.values(APP_CONFIG.ROLES).includes(role as any);
  },

  isValidInterest: (interest: string): boolean => {
    return Object.values(APP_CONFIG.INTERESTS).includes(interest as any);
  }
};

export default validators;