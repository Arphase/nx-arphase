import { createAction, props } from '@ngrx/store';
import { Reservation } from '@valmira/domain';

import { SearchReservationPayload } from '../models/search-reservation-payload.model';

export const getReservationDetail = createAction(
  '[Reservation detail] Get reservation detail',
  props<{ payload: SearchReservationPayload }>(),
);

export const getReservationDetailSuccess = createAction(
  '[Reservation detail] Get reservation detail success',
  props<{ reservation: Reservation }>(),
);

export const getReservationDetailFailed = createAction('[Reservation detail] Get reservation detail failed');
