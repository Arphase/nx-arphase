import { Action, createReducer, on } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { DashboardState } from './dashboard.state';

export const initialState: DashboardState = {
  guaranteeSummary: null,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.getGuaranteeSummarySuccess, (state, action) => ({
    ...state,
    guaranteeSummary: action.payload,
  }))
);

export function reducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}
