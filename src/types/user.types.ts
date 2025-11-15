import type { UserRole , InterestCategory} from '../utils/constants/app';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  industry?: string;
  interests: InterestCategory[];
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
  industry?: string;
  interests: InterestCategory[];
}

export interface AuthUser {
  user: User;
  token: string;
  refreshToken?: string; // Opcional para futura implementación
}