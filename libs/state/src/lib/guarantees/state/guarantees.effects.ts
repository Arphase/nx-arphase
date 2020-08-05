import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GuaranteeDataService } from '../services';
import * as GuaranteesActions from './guarantees.actions';

@Injectable()
export class GuaranteesEffects {
  getScheduledPaymentsDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuaranteesActions.getGuaranteePdf),
      mergeMap((payload) =>
        this.guaranteeDataService.getGuaranteePdf(payload).pipe(
          map(() => GuaranteesActions.getGuaranteePdfSuccess()),
          catchError(() => of(GuaranteesActions.getGuaranteePdfFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private guaranteeDataService: GuaranteeDataService
  ) {}
}
