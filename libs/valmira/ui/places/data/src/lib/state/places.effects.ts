import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PlaceDataService } from '../services';
import * as PlacesActions from './places.actions';

@Injectable()
export class PlacesEfects {
  getOccupiedDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlacesActions.getOccupiedDates),
      mergeMap(({ id }) =>
        this.placeDataService.getOccupiedDates(id).pipe(
          map(dates => PlacesActions.getOccupiedDatesSuccess({ dates })),
          catchError(() => of(PlacesActions.getOccupiedDatesFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private placeDataService: PlaceDataService) {}
}