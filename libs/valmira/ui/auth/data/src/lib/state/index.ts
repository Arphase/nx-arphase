import * as actions from './auth.actions';
import { reducer } from './auth.reducer';
import * as selectors from './auth.selectors';

export * from './auth.state';
export * from './auth.effects';

export const fromAuth = { actions, reducer, selectors };
