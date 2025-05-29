import { Action, createReducer, on } from '@ngrx/store';

import * as ReservationDetailActions from './reservation-detail.actions';
import { ReservationDetailState } from './reservation-detail.state';

export const initialState: ReservationDetailState = {
  reservation: null,
};

const reservationDetailReducer = createReducer(
  initialState,
  on(ReservationDetailActions.getReservationDetailSuccess, (state, action) => ({
    ...state,
    reservation: action.reservation,
  })),
);

export function reducer(state: ReservationDetailState, action: Action) {
  return reservationDetailReducer(state, action);
}
