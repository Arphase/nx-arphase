import { createAction, props } from '@ngrx/store';
import { User } from '@valmira/domain';

import { SignInPayload } from '../models';

export const signIn = createAction('[Auth] Sign in', props<{ payload: SignInPayload }>());

export const signInSuccess = createAction('[Auth] Sign in success', props<{ user: Partial<User> }>());

export const signInFailed = createAction('[Auth] Sign in failed');

export const logout = createAction('[Auth] logout');

export const loadUserFromStorage = createAction('[Auth] load user from storage', props<{ user: Partial<User> }>());
