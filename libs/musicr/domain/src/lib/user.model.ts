import { ResetPassword } from './reset-password.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  salt?: string;
  token?: string;
  resetPassword?: ResetPassword;
}
