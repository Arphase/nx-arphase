import { SetPasswordPayload, SignInRequest, User } from '@ivt/c-data';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Auth] Sign in', props<{ payload: SignInRequest }>());

export const signInSuccess = createAction('[Auth] Sign in success', props<{ user: User }>());

export const signInFailed = createAction('[Auth] Sign in failed');

export const logout = createAction('[Auth] logout');

export const setPassword = createAction('[Auth] Set password', props<{ payload: SetPasswordPayload }>());

export const setPasswordSuccess = createAction('[Auth] Set password success', props<{ payload: SetPasswordPayload }>());

export const setPasswordFailed = createAction('[Auth] Set password failed');
