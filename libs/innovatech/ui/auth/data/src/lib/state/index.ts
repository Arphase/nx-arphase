import * as actions from './auth.actions';
import * as reducer from './auth.reducer';
import * as selectors from './auth.selectors';

export * from './auth.selectors';
export * from './auth.effects';
export * from './auth.state';

export const fromAuth = {
  actions,
  reducer: reducer.reducer,
  selectors,
  initialState: reducer.initialState,
};
