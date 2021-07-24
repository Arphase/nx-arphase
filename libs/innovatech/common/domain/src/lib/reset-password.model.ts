import { User } from './user.model';

export interface ResetPassword {
  user: User;
  userId?: number;
  passwordToken: string;
  timestamp: Date;
}

export const specialCharactersForPassword = ['@', '!', '#', '$', '%', '?', '_'];
