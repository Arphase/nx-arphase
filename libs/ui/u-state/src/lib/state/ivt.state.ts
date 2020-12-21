import { AuthState } from '../auth/state/auth.state';
import { DashboardState } from '../dashboard/state/dashboard.state';

export interface IvtState {
  auth: AuthState;
  dashboard: DashboardState;
}
