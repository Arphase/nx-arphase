import { Action, createReducer, on } from '@ngrx/store';

import * as PlaceDetailActions from './place-detail.actions';
import { PlaceDetailState } from './place-detail.state';

export const initialState: PlaceDetailState = {
  reservationPreview: null,
};

const placeDetailReducer = createReducer(
  initialState,
  on(PlaceDetailActions.getReservationPreviewSuccess, (state, action) => ({
    ...state,
    reservationPreview: action.reservation,
  })),
);

export function reducer(state: PlaceDetailState, action: Action) {
  return placeDetailReducer(state, action);
}
