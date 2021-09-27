import { createAction, props } from '@ngrx/store';
import { Customer, Promocode, Reservation } from '@valmira/domain';

export const getCustomerByEmail = createAction(
  '[Reservation wizard] Get customer by email',
  props<{ email: string }>()
);

export const getCustomerByEmailSuccess = createAction(
  '[Reservation wizard] Get customer by email success',
  props<{ customer: Customer }>()
);

export const getCustomerByEmailFailed = createAction('[Reservation wizard] Get customer by email failed');

export const getPromocodeByName = createAction('[Reservation wizard] Get promocode by name', props<{ name: string }>());

export const getPromocodeByNameSuccess = createAction(
  '[Reservation wizard] Get promocode by name success',
  props<{ promocode: Promocode }>()
);

export const getPromocodeByNameFailed = createAction('[Reservation wizard] Get promocode by name failed');

export const updateReservation = createAction(
  '[Reservation wizard] Update reservation',
  props<{ reservation: Partial<Reservation> }>()
);

export const updateReservationSuccess = createAction(
  '[Reservation wizard] Update reservation success',
  props<{ reservation: Reservation }>()
);

export const updateReservationFailed = createAction('[Reservation wizard] Update reservation failed');

export const createPaymentIntent = createAction(
  '[Reservation wizard] Create payment intent',
  props<{ reservationId: number }>()
);

export const createPaymentIntentSuccess = createAction(
  '[Reservation wizard] Create payment intent success',
  props<{ key: string; reservation: Reservation }>()
);

export const createPaymentIntentFailed = createAction('[Reservation wizard] Create payment intent failed');
