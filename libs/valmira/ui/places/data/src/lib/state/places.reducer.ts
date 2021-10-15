import { Action, createReducer, on } from '@ngrx/store';

import * as PlacesActions from './places.actions';
import { PlacesState } from './places.state';

export const initialState: PlacesState = {
  startDateOccupiedDates: [],
  endDateOccupiedDates: [],
  summary: [],
};

const placesReducer = createReducer(
  initialState,
  on(PlacesActions.getStartOccupiedDatesSuccess, (state, action) => ({
    ...state,
    startDateOccupiedDates: action.dates,
  })),
  on(PlacesActions.getEndDateOccupiedDatesSuccess, (state, action) => ({
    ...state,
    endDateOccupiedDates: action.dates,
  })),
  on(PlacesActions.getCategorySummarySuccess, (state, action) => ({
    ...state,
    summary: action.summary,
  }))
);

export function reducer(state: PlacesState, action: Action) {
  return placesReducer(state, action);
}
