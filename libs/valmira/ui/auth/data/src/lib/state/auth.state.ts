import { User } from '@valmira/domain';

export interface AuthState {
  user: Partial<User>;
}
