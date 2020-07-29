import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthState = createSelector(
  getAuthFeatureState,
  (state) => state
);

export const getAuthUserStateState = createSelector(
  getAuthFeatureState,
  (state) => state.user
);
