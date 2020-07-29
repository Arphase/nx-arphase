import * as actions from './auth.actions';
import * as reducer from './auth.reducer';

export * from './auth.selectors';
export * from './auth.effects';

export const fromAuth = {
  actions,
  reducer: reducer.reducer,
  initialState: reducer.initialState,
};
