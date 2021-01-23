import { Vehicle } from '@ivt/c-data';
import { createAction, props } from '@ngrx/store';

export const getVehicleByVin = createAction('[Vehicles] Get vehicle by vin', props<{ vin: string }>());

export const getVehicleByVinSuccess = createAction(
  '[Vehicles] Get vehicle by vin success',
  props<{ payload: Vehicle | null }>()
);

export const getVehicleByVinFailed = createAction('[Vehicles] Get vehicle by vin failed');
