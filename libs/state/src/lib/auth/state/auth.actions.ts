import { SignInRequest } from '@innovatech/data';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] Sign in',
  props<{ payload: SignInRequest }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign in success',
  props<{ user: any }>()
);

export const signInFailed = createAction('[Auth] Sign in failed');
