import { GuaranteeSummary } from '@ivt/data';
import { createAction, props } from '@ngrx/store';

export const getGuaranteeSummary = createAction(
  '[Dashboard] Get guarantee summary'
);

export const getGuaranteeSummarySuccess = createAction(
  '[Dashboard] Get guarantee summary success',
  props<{ payload: GuaranteeSummary }>()
);

export const getGuaranteeSummaryFailed = createAction(
  '[Dashboard] Get guarantee summary failed'
);
