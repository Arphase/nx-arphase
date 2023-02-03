import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CategoryDataService } from '../services/category-data.service';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEfects {
  saveCategoriesOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.saveCategoriesOrder),
      mergeMap(({ categories }) =>
        this.categoryDataService.saveCategoriesOrder(categories).pipe(
          map(() => CategoriesActions.saveCategoriesOrderSuccess()),
          catchError(() => of(CategoriesActions.saveCategoriesOrderFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private categoryDataService: CategoryDataService) {}
}
