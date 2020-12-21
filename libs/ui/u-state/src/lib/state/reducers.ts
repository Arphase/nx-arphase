import { ActionReducerMap } from '@ngrx/store';

import { fromAuth } from '../auth/state';
import { AuthState } from '../auth/state/auth.state';

export const reducers: ActionReducerMap<{ auth: AuthState }> = {
  auth: fromAuth.reducer,
};
