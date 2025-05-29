import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlaceDetailState } from './place-detail.state';

const getPlaceDetailFeatureState = createFeatureSelector<PlaceDetailState>('placeDetail');

export const getPlaceDetailState = createSelector(getPlaceDetailFeatureState, state => state);

export const getPlaceDetailReservationPreview = createSelector(
  getPlaceDetailFeatureState,
  state => state.reservationPreview,
);
