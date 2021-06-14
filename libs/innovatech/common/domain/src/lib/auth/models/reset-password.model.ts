import { User } from '../../users';

export interface ResetPassword {
  user: User;
  userId?: number;
  passwordToken: string;
  timestamp: Date;
}
