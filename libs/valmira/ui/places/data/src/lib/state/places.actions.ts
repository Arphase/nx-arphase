import { QueryParams } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { PlaceCategorySummary } from '@valmira/domain';

export const getOccupiedDates = createAction('[Places] Get occupied dates', props<{ id: number }>());

export const getOccupiedDatesSuccess = createAction('[Places] Get occupied dates success', props<{ dates: Date[] }>());

export const getOccupiedDatesFailed = createAction('[Places] Get occupied dates failed');

export const getCategorySummary = createAction('[Places] Get category summary', props<{ params: QueryParams }>());

export const getCategorySummarySuccess = createAction(
  '[Places] Get category summary success',
  props<{ summary: PlaceCategorySummary }>()
);

export const getCategorySummaryFailed = createAction('[Places] Get category summary failed');
