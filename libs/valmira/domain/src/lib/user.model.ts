import { ResetPassword } from './reset-password.model';

export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles | string;
  resetPassword?: ResetPassword;
  token?: string;
}

export enum UserRoles {
  superAdmin = 1,
  admin = 2,
}
