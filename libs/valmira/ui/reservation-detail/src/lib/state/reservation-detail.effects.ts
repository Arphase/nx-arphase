import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ReservationDetailService } from '../services/reservation-detail.service';
import * as ReservationDetailActions from './reservation-detail.actions';

@Injectable()
export class ReservationDetailEffects {
  getReservationDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationDetailActions.getReservationDetail),
      mergeMap(({ payload }) =>
        this.reservationDetailService.getReservationDetail(payload).pipe(
          map(reservation => ReservationDetailActions.getReservationDetailSuccess({ reservation })),
          catchError(() => of(ReservationDetailActions.getReservationDetailFailed())),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private reservationDetailService: ReservationDetailService,
  ) {}
}
