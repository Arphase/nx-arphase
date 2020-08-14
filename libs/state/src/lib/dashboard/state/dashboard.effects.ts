import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GuaranteeDataService } from '../../guarantees';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  getGuaranteeSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getGuaranteeSummary),
      mergeMap(() =>
        this.guaranteeDataService.getGuaranteeSummary().pipe(
          map((payload) =>
            DashboardActions.getGuaranteeSummarySuccess({ payload })
          ),
          catchError(() => of(DashboardActions.getGuaranteeSummaryFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private guaranteeDataService: GuaranteeDataService
  ) {}
}
