import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PlaceDataService } from '../services';
import * as PlacesActions from './places.actions';

@Injectable()
export class PlacesEfects {
  getStartOccupiedDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlacesActions.getStartOccupiedDates),
      mergeMap(({ id }) =>
        this.placeDataService.getOccupiedDates(id, 'startDate').pipe(
          map(dates => PlacesActions.getStartOccupiedDatesSuccess({ dates })),
          catchError(() => of(PlacesActions.getStartOccupiedDatesFailed()))
        )
      )
    )
  );

  getEndDateOccupiedDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlacesActions.getEndDateOccupiedDates),
      mergeMap(({ id }) =>
        this.placeDataService.getOccupiedDates(id, 'endDate').pipe(
          map(dates => PlacesActions.getEndDateOccupiedDatesSuccess({ dates })),
          catchError(() => of(PlacesActions.getEndDateOccupiedDatesFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private placeDataService: PlaceDataService) {}
}
