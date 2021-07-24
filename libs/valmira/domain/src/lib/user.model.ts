import { ResetPassword } from './reset-password.model';

export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  resetPassword?: ResetPassword;
}

export enum UserRoles {
  superAdmin = 1,
  admin = 2,
}
