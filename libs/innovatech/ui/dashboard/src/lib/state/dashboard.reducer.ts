import { Action, createReducer, on } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { DashboardState } from './dashboard.state';

export const initialState: DashboardState = {
  guaranteeSummary: null,
  queryParams: {},
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.getGuaranteeSummary, (state, action) => ({
    ...state,
    queryParams: {
      ...state.queryParams,
      ...action.payload,
    },
  })),
  on(DashboardActions.getGuaranteeSummarySuccess, (state, action) => ({
    ...state,
    guaranteeSummary: action.payload,
  })),
);

export function reducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}
