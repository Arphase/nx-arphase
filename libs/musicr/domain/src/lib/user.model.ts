import { ResetPassword } from './reset-password.model';

export interface User {
  id: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password?: string;
  salt?: string;
  token?: string;
  resetPassword?: ResetPassword;
}
