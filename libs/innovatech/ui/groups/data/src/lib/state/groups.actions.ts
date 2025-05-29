import { Product } from '@innovatech/common/domain';
import { createAction, props } from '@ngrx/store';

export const getGroupProducts = createAction('[Groups] Get group products', props<{ groupId: number }>());

export const getGroupProductsSuccess = createAction(
  '[Groups] Get group products success',
  props<{ payload: Product[] }>(),
);

export const getGroupProductsFailed = createAction('[Groups] Get group products failed');

export const assignGroupProducts = createAction(
  '[Groups] Assign group products',
  props<{ payload: { groupId: number; productIds: number[] } }>(),
);

export const assignGroupProductsSuccess = createAction('[Groups] Assign group products success');

export const assignGroupProductsFailed = createAction('[Groups] Assign group products failed');

export const clearGroupsStore = createAction('[Groups] Clear groups store');
