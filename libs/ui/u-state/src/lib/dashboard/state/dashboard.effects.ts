import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { GuaranteeDataService } from '../../guarantees';
import { IvtState } from '../../state';
import * as DashboardActions from './dashboard.actions';
import { getDashboardQueryParamsState } from './dashboard.selectors';

@Injectable()
export class DashboardEffects {
  getGuaranteeSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getGuaranteeSummary),
      withLatestFrom(this.store.pipe(select(getDashboardQueryParamsState))),
      mergeMap(([{ payload }, queryParams]) =>
        this.guaranteeDataService.getGuaranteeSummary({ ...queryParams, ...payload }).pipe(
          map(payload => DashboardActions.getGuaranteeSummarySuccess({ payload })),
          catchError(() => of(DashboardActions.getGuaranteeSummaryFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private guaranteeDataService: GuaranteeDataService,
    private store: Store<IvtState>
  ) {}
}
