import { GuaranteeSummary } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';

export const getGuaranteeSummary = createAction(
  '[Dashboard] Get guarantee summary',
  props<{ payload?: QueryParams }>()
);

export const getGuaranteeSummarySuccess = createAction(
  '[Dashboard] Get guarantee summary success',
  props<{ payload: GuaranteeSummary }>()
);

export const getGuaranteeSummaryFailed = createAction('[Dashboard] Get guarantee summary failed');
