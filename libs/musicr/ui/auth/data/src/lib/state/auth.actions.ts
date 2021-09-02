import { SignInPayload } from '@arphase/ui/auth';
import { User } from '@musicr/domain';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Auth] Sign in', props<{ payload: SignInPayload }>());

export const signInSuccess = createAction('[Auth] Sign in success', props<{ user: Partial<User> }>());

export const signInFailed = createAction('[Auth] Sign in failed');

export const logout = createAction('[Auth] logout');

export const loadUserFromStorage = createAction('[Auth] load user from storage', props<{ user: User }>());
