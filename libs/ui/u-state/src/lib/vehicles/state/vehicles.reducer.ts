import { Action, createReducer, on } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesState } from './vehicles.state';

export const initialState: VehiclesState = {
  vehicle: null,
};

const vehiclesReducer = createReducer(
  initialState,
  on(VehiclesActions.getVehicleByVinSuccess, (state, action) => ({
    ...state,
    vehicle: action.payload,
  })),
  on(VehiclesActions.clearVehiclesState, (state, action) => initialState)
);

export function reducer(state: VehiclesState, action: Action) {
  return vehiclesReducer(state, action);
}
