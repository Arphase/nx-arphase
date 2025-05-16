import * as actions from './vehicles.actions';
import { initialState, reducer } from './vehicles.reducer';
import * as selectors from './vehicles.selectors';

export * from './vehicles.effects';
export * from './vehicles.selectors';

export const fromVehicles = { actions, reducer, selectors, initialState };
