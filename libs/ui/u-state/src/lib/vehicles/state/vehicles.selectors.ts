import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VehiclesState } from './vehicles.state';

const getVehiclesFeatureState = createFeatureSelector<VehiclesState>('vehicles');

export const getVehicleState = createSelector(getVehiclesFeatureState, state => state);

export const getVehiclesVehicleState = createSelector(getVehiclesFeatureState, state => state.vehicle);
