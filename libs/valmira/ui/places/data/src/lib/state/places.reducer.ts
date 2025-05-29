import { Action, createReducer, on } from '@ngrx/store';

import * as PlacesActions from './places.actions';
import { PlacesState } from './places.state';

export const initialState: PlacesState = {
  startDateOccupiedDates: [],
  endDateOccupiedDates: [],
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
);

export function reducer(state: PlacesState, action: Action) {
  return placesReducer(state, action);
}
