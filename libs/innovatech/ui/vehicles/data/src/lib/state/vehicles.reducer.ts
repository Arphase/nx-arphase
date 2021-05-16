import { Action, createReducer, on } from '@ngrx/store';

import * as VehiclesActions from './vehicles.actions';
import { VehiclesState } from './vehicles.state';

export const initialState: VehiclesState = {
  vehicle: null,
  error: null,
};

const vehiclesReducer = createReducer(
  initialState,
  on(VehiclesActions.getVehicleByVinSuccess, (state, action) => ({
    ...state,
    vehicle: action.payload,
    error: null,
  })),
  on(VehiclesActions.getVehicleByVinFailed, (state, action) => ({
    ...state,
    vehicle: null,
    error: action.payload,
  })),
  on(VehiclesActions.clearVehiclesState, (state, action) => initialState)
);

export function reducer(state: VehiclesState, action: Action) {
  return vehiclesReducer(state, action);
}
