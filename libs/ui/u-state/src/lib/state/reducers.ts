import { AuthState, fromAuth } from '@innovatech/ui/auth/data-access';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<{ auth: AuthState; router: RouterReducerState }> = {
  auth: fromAuth.reducer,
  router: routerReducer,
};
