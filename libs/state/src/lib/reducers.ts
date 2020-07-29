import { ActionReducerMap } from '@ngrx/store';

import { fromAuth } from './auth/state';

export const reducers: ActionReducerMap<any> = {
  auth: fromAuth.reducer,
};
