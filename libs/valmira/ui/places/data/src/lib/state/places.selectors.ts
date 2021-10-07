import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlacesState } from './places.state';

const getPlacesFeatureState = createFeatureSelector<PlacesState>('places');

export const getPlacesState = createSelector(getPlacesFeatureState, state => state);

export const getPlacesOccupiedDates = createSelector(getPlacesFeatureState, state => state.occupiedDates);

export const getPlacesCategorySummary = createSelector(getPlacesFeatureState, state => state.summary);
