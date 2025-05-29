import { ApsHttpErrorResponse } from '@arphase/common';
import { Vehicle } from '@innovatech/common/domain';
import { createAction, props } from '@ngrx/store';

export const getVehicleByVin = createAction('[Vehicles] Get vehicle by vin', props<{ vin: string }>());

export const getVehicleByVinSuccess = createAction(
  '[Vehicles] Get vehicle by vin success',
  props<{ payload: Vehicle | null }>(),
);

export const getVehicleByVinFailed = createAction(
  '[Vehicles] Get vehicle by vin failed',
  props<{ payload: ApsHttpErrorResponse }>(),
);

export const clearVehiclesState = createAction('[Vehicles] Clear vehicles state');
