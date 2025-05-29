import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PlaceDetailService } from '../services/place-detail.service';
import * as PlaceDetailActions from './place-detail.actions';

@Injectable()
export class PlaceDetailEffects {
  getReservationPreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaceDetailActions.getReservationPreview),
      mergeMap(({ reservation }) =>
        this.placeDetailService.getReservationPreview(reservation).pipe(
          map(response => PlaceDetailActions.getReservationPreviewSuccess({ reservation: response })),
          catchError(() => of(PlaceDetailActions.getReservationPreviewFailed())),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private placeDetailService: PlaceDetailService,
  ) {}
}
