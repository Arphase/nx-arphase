import { createAction, props } from '@ngrx/store';
import { Customer } from '@valmira/domain';

export const getCustomerByEmail = createAction(
  '[Reservation wizard] Get customer by email',
  props<{ email: string }>()
);

export const getCustomerByEmailSuccess = createAction(
  '[Reservation wizard] Get customer by email success',
  props<{ customer: Customer }>()
);

export const getCustomerByEmailFailed = createAction('[Reservation wizard] Get customer by email failed');
