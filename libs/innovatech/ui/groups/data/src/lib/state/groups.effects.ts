import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GroupDataService } from '../services/group-data.service';
import * as GroupsActions from './groups.actions';

@Injectable()
export class GroupsEffects {
  getGroupProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getGroupProducts),
      mergeMap(({ groupId }) =>
        this.groupDataService.getGroupProducts(groupId).pipe(
          map(payload => GroupsActions.getGroupProductsSuccess({ payload })),
          catchError(() => of(GroupsActions.getGroupProductsFailed()))
        )
      )
    )
  );

  assignGroupProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.assignGroupProducts),
      mergeMap(({ payload }) =>
        this.groupDataService.assignGroupProducts(payload).pipe(
          map(() => GroupsActions.assignGroupProductsSuccess()),
          catchError(() => of(GroupsActions.assignGroupProductsFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private groupDataService: GroupDataService) {}
}
