import * as actions from './groups.actions';
import { reducer } from './groups.reducer';

export * from './groups.selectors';
export * from './groups.effects';

export const fromGroups = {
  actions,
  reducer: reducer,
};
