import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { ReservationWizardService } from '../services/reservation-wizard.service';
import * as ReservationWizardActions from './reservation-wizard.actions';

@Injectable()
export class ReservationWizardEffects {
  getCustomerByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationWizardActions.getCustomerByEmail),
      mergeMap(({ email }) =>
        this.reservationWizardService.getCustomerByEmail(email).pipe(
          map(customer => ReservationWizardActions.getCustomerByEmailSuccess({ customer })),
          catchError(() => of(ReservationWizardActions.getCustomerByEmailFailed()))
        )
      )
    )
  );

  getPromocodeByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationWizardActions.getPromocodeByName),
      mergeMap(({ name }) =>
        this.reservationWizardService.getPromocodeByName(name).pipe(
          map(promocode => ReservationWizardActions.getPromocodeByNameSuccess({ promocode })),
          catchError(() => of(ReservationWizardActions.getPromocodeByNameFailed()))
        )
      )
    )
  );

  getPromocodeByNameSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationWizardActions.getPromocodeByNameSuccess),
      withLatestFrom(this.reservationCollectionService.currentItem$),
      map(([{ promocode }, reservation]) =>
        ReservationWizardActions.updateReservation({ reservation: { id: reservation.id, promocodeId: promocode.id } })
      )
    )
  );

  updateReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationWizardActions.updateReservation),
      mergeMap(({ reservation }) =>
        this.reservationWizardService.updateReservation(reservation).pipe(
          map(response => ReservationWizardActions.updateReservationSuccess({ reservation: response })),
          catchError(() => of(ReservationWizardActions.updateReservationFailed()))
        )
      )
    )
  );

  updateReservationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReservationWizardActions.updateReservationSuccess),
        map(({ reservation }) => this.reservationCollectionService.updateOneInCache(reservation))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private reservationWizardService: ReservationWizardService,
    private reservationCollectionService: ReservationCollectionService
  ) {}
}
