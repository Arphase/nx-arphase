import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  user: {
    id: null,
    firstName: null,
    secondName: null,
    lastName: null,
    secondLastName: null,
    email: null,
    role: null,
    token: null,
    companyId: null,
  },
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInSuccess, AuthActions.loadUserFromStorage, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    user: null,
  }))
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}
