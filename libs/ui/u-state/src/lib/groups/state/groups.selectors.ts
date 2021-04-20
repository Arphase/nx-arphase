import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GroupsState } from './groups.state';

const getGroupsFeatureState = createFeatureSelector<GroupsState>('groups');

export const getGroupstate = createSelector(getGroupsFeatureState, state => state);

export const getGroupsProductsState = createSelector(getGroupsFeatureState, state => state.products);
