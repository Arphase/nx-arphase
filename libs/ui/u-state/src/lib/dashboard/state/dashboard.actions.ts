import { GuaranteeSummary, IvtQueryParams } from '@ivt/c-data';
import { createAction, props } from '@ngrx/store';

export const getGuaranteeSummary = createAction(
  '[Dashboard] Get guarantee summary',
  props<{ payload?: IvtQueryParams }>()
);

export const getGuaranteeSummarySuccess = createAction(
  '[Dashboard] Get guarantee summary success',
  props<{ payload: GuaranteeSummary }>()
);

export const getGuaranteeSummaryFailed = createAction('[Dashboard] Get guarantee summary failed');
