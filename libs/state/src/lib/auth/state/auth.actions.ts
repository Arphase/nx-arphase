import { SignInRequest, User } from '@ivt/data';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] Sign in',
  props<{ payload: SignInRequest }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign in success',
  props<{ user: User }>()
);

export const signInFailed = createAction('[Auth] Sign in failed');

export const logout = createAction('[Auth] logout');
