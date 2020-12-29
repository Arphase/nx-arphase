import { User } from '../../users';

export interface ResetPassword {
  user: User;
  passwordToken: string;
  timestamp: Date;
}
