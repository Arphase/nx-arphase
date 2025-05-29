import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardState } from './dashboard.state';

const getDashboardFeatureState = createFeatureSelector<DashboardState>('dashboard');

export const getDashboardState = createSelector(getDashboardFeatureState, state => state);

export const getDashboardGuaranteeSummaryState = createSelector(
  getDashboardFeatureState,
  state => state.guaranteeSummary,
);

export const getDashboardQueryParamsState = createSelector(getDashboardFeatureState, state => state.queryParams);
