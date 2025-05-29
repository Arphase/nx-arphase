import { createAction, props } from '@ngrx/store';
import { Reservation } from '@valmira/domain';

export const getReservationPreview = createAction(
  '[Place detail] Get reservation preview',
  props<{ reservation: Partial<Reservation> }>(),
);

export const getReservationPreviewSuccess = createAction(
  '[Place detail] Get reservation preview success',
  props<{ reservation: Reservation }>(),
);

export const getReservationPreviewFailed = createAction('[Place detail] Get reservation preview failed');
