import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private reservationWizardService: ReservationWizardService) {}
}
