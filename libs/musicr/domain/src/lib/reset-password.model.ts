import { User } from './user.model';

export interface ResetPassword {
  id?: number;
  passwordToken: string;
  timestamp: Date;
  userId: number;
  user: User;
}
