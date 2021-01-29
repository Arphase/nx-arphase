import { RouterReducerState } from '@ngrx/router-store';

import { AuthState } from '../auth/state/auth.state';
import { DashboardState } from '../dashboard/state/dashboard.state';
import { VehiclesState } from '../vehicles/state/vehicles.state';

export interface IvtState {
  auth: AuthState;
  dashboard: DashboardState;
  router: RouterReducerState;
  vehicles: VehiclesState;
}
