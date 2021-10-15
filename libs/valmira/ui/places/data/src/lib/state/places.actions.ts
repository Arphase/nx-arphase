import { QueryParams } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { PlaceCategorySummary } from '@valmira/domain';

export const getStartOccupiedDates = createAction('[Places] Get start date occupied dates', props<{ id: number }>());

export const getStartOccupiedDatesSuccess = createAction(
  '[Places] Get start date occupied dates success',
  props<{ dates: Date[] }>()
);

export const getStartOccupiedDatesFailed = createAction('[Places] Get start date occupied dates failed');

export const getEndDateOccupiedDates = createAction('[Places] Get end date occupied dates', props<{ id: number }>());

export const getEndDateOccupiedDatesSuccess = createAction(
  '[Places] Get end date occupied dates success',
  props<{ dates: Date[] }>()
);

export const getEndDateOccupiedDatesFailed = createAction('[Places] Get end date occupied dates failed');

export const getCategorySummary = createAction('[Places] Get category summary', props<{ params: QueryParams }>());

export const getCategorySummarySuccess = createAction(
  '[Places] Get category summary success',
  props<{ summary: PlaceCategorySummary }>()
);

export const getCategorySummaryFailed = createAction('[Places] Get category summary failed');
