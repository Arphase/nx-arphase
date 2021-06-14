import * as actions from './groups.actions';
import { reducer } from './groups.reducer';

export * from './groups.effects';
export * from './groups.selectors';

export const fromGroups = { actions, reducer };
