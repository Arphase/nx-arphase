import { ResetPassword } from './reset-password.model';

export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  resetPassword?: ResetPassword;
  token?: string;
}

export enum UserRoles {
  superAdmin = 'superAdmin',
  admin = 'admin',
}
