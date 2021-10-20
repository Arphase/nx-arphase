import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlacesState } from './places.state';

const getPlacesFeatureState = createFeatureSelector<PlacesState>('places');

export const getPlacesState = createSelector(getPlacesFeatureState, state => state);

export const getPlacesStartDateOccupiedDates = createSelector(
  getPlacesFeatureState,
  state => state.startDateOccupiedDates
);

export const getPlacesEndDateOccupiedDates = createSelector(getPlacesFeatureState, state => state.endDateOccupiedDates);
