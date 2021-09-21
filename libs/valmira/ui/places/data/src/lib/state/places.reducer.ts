import { Action, createReducer, on } from '@ngrx/store';

import * as PlacesActions from './places.actions';
import { PlacesState } from './places.state';

export const initialState: PlacesState = {
  occupiedDates: [],
};

const placesReducer = createReducer(
  initialState,
  on(PlacesActions.getOccupiedDatesSuccess, (state, action) => ({
    ...state,
    occupiedDates: action.dates,
  }))
);

export function reducer(state: PlacesState, action: Action) {
  return placesReducer(state, action);
}
