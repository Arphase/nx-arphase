import { createAction, props } from '@ngrx/store';

export const getGuaranteePdf = createAction(
  '[Guarantees] Get guarantee PDF',
  props<{ client; vehicle }>()
);

export const getGuaranteePdfSuccess = createAction(
  '[Guarantees] Get guarantee PDF success'
);

export const getGuaranteePdfFailed = createAction(
  '[Guarantees] Get guarantee PDF failed'
);
