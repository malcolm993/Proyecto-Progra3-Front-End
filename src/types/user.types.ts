export type UserRole = 'organizer' | 'participant';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  industry?: string;
  interests?: string[];
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
  interests?: string[];
}