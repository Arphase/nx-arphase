import * as actions from './vehicles.actions';
import { reducer } from './vehicles.reducer';

export * from './vehicles.selectors';
export * from './vehicles.effects';

export const fromVehicles = { actions, reducer };
