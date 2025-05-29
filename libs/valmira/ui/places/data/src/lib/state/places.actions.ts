import { createAction, props } from '@ngrx/store';

export const getStartOccupiedDates = createAction('[Places] Get start date occupied dates', props<{ id: number }>());

export const getStartOccupiedDatesSuccess = createAction(
  '[Places] Get start date occupied dates success',
  props<{ dates: Date[] }>(),
);

export const getStartOccupiedDatesFailed = createAction('[Places] Get start date occupied dates failed');

export const getEndDateOccupiedDates = createAction('[Places] Get end date occupied dates', props<{ id: number }>());

export const getEndDateOccupiedDatesSuccess = createAction(
  '[Places] Get end date occupied dates success',
  props<{ dates: Date[] }>(),
);

export const getEndDateOccupiedDatesFailed = createAction('[Places] Get end date occupied dates failed');
