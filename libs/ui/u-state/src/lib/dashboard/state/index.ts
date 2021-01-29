import * as actions from './dashboard.actions';
import * as reducer from './dashboard.reducer';

export * from './dashboard.selectors';
export * from './dashboard.effects';

export const fromDashboard = {
  actions,
  reducer: reducer.reducer,
};
