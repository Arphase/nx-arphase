import { DeepPartial } from '@arphase/common';
import { Category } from '@musicr/domain';
import { createAction, props } from '@ngrx/store';

export const saveCategoriesOrder = createAction(
  '[Categories] Save categories order',
  props<{ categories: DeepPartial<Category>[] }>(),
);

export const saveCategoriesOrderSuccess = createAction('[Categories] Save categories order success');

export const saveCategoriesOrderFailed = createAction('[Categories] Save categories order failed');
