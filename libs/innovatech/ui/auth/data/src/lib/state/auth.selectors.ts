import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthState = createSelector(getAuthFeatureState, state => state);

export const getAuthUserStateState = createSelector(getAuthFeatureState, state => state.user);

export const getAuthUserNameState = createSelector(
  getAuthFeatureState,
  state => `${state.user?.firstName} ${state.user?.lastName}`,
);

export const getAuthUserEmailState = createSelector(getAuthFeatureState, state => state.user?.email);

export const getAuthUserRoleState = createSelector(getAuthFeatureState, state => state.user?.role);

export const getAuthUserCompanyIdState = createSelector(getAuthFeatureState, state => state.user?.companyId);
