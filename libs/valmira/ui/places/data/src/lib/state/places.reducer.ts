import { Action, createReducer, on } from '@ngrx/store';

import * as PlacesActions from './places.actions';
import { PlacesState } from './places.state';

export const initialState: PlacesState = {
  occupiedDates: [],
  summary: [],
};

const placesReducer = createReducer(
  initialState,
  on(PlacesActions.getOccupiedDatesSuccess, (state, action) => ({
    ...state,
    occupiedDates: action.dates,
  })),
  on(PlacesActions.getCategorySummarySuccess, (state, action) => ({
    ...state,
    summary: action.summary,
  }))
);

export function reducer(state: PlacesState, action: Action) {
  return placesReducer(state, action);
}
