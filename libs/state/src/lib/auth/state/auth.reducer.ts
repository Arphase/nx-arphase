import { UserRole } from '@ivt/data';
import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  user: {
    id: Number(localStorage.getItem('id')),
    firstName: localStorage.getItem('firstName'),
    secondName: localStorage.getItem('secondName'),
    lastName: localStorage.getItem('lastName'),
    secondLastName: localStorage.getItem('secondLastName'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role') as UserRole,
    token: localStorage.getItem('token'),
  },
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInSuccess, (state, action) => ({
    ...state,
    user: action.user,
  }))
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}
