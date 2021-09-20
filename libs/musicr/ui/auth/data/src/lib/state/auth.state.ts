import { User } from '@musicr/domain';

export interface AuthState {
  user: Partial<User>;
}
