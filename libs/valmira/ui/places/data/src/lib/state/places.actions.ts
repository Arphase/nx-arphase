import { createAction, props } from '@ngrx/store';

export const getOccupiedDates = createAction('[Places] Get occupied dates', props<{ id: number }>());

export const getOccupiedDatesSuccess = createAction('[Places] Get occupied dates success', props<{ dates: Date[] }>());

export const getOccupiedDatesFailed = createAction('[Places] Get occupied dates failed');
