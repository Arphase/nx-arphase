import { SetPasswordPayload, SignInRequest, User } from '@innovatech/common/domain';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Auth] Sign in', props<{ payload: SignInRequest }>());

export const signInSuccess = createAction('[Auth] Sign in success', props<{ user: User }>());

export const signInFailed = createAction('[Auth] Sign in failed');

export const logout = createAction('[Auth] logout');

export const validateToken = createAction('[Auth] Validate token', props<{ payload: Partial<SetPasswordPayload> }>());

export const validateTokenSuccess = createAction('[Auth] Validate token success');

export const validateTokenFailed = createAction('[Auth] Validate token failed');

export const setPassword = createAction('[Auth] Set password', props<{ payload: SetPasswordPayload }>());

export const setPasswordSuccess = createAction('[Auth] Set password success', props<{ payload: SignInRequest }>());

export const setPasswordFailed = createAction('[Auth] Set password failed');

export const sendPasswordEmail = createAction('[Auth] Send password email', props<{ payload: Partial<User> }>());

export const sendPasswordEmailSuccess = createAction('[Auth] Send password email success');

export const sendPasswordEmailFailed = createAction('[Auth] Send password email failed');

export const loadUserFromStorage = createAction('[Auth] load user from storage', props<{ user: User }>());
