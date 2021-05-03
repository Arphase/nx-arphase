import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VehiclesState } from './vehicles.state';

const getVehiclesFeatureState = createFeatureSelector<VehiclesState>('vehicles');

export const getVehicleState = createSelector(getVehiclesFeatureState, state => state);

export const getVehiclesVehicleState = createSelector(getVehiclesFeatureState, state => state.vehicle);

export const getVehiclesErrorState = createSelector(getVehiclesFeatureState, state => state.error);

export const getVehiclesErrorMessageState = createSelector(getVehiclesFeatureState, state => state.error?.message);
