import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { VehicleDataService } from '../services';
import * as VehiclesActions from './vehicles.actions';

@Injectable()
export class VehiclesEffects {
  getVehicleByVin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.getVehicleByVin),
      mergeMap(({ vin }) =>
        this.vehicleDataService.getVehicleByVin(vin).pipe(
          map(payload => VehiclesActions.getVehicleByVinSuccess({ payload })),
          catchError(error => of(VehiclesActions.getVehicleByVinFailed({ payload: error.error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private vehicleDataService: VehicleDataService,
  ) {}
}
