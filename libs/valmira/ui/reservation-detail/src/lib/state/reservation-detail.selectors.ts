import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReservationDetailState } from './reservation-detail.state';

const getReservationDetailFeatureState = createFeatureSelector<ReservationDetailState>('reservationDetail');

export const getReservationDetailState = createSelector(getReservationDetailFeatureState, state => state);

export const getReservationDetailReservationState = createSelector(
  getReservationDetailFeatureState,
  state => state.reservation
);
