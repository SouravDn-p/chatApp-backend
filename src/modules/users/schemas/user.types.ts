import { UserRole } from './user.schema';

export interface CreateUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  refreshToken?: string;
}

export interface SafeUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  refreshToken?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
