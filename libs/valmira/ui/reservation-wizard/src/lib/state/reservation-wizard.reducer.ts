import { Action, createReducer, on } from '@ngrx/store';

import * as ReservationWizardActions from './reservation-wizard.actions';
import { ReservationWizardState } from './reservation-wizard.state';

export const initialState: ReservationWizardState = {
  currentCustomer: null,
};

const reservationWizardReducer = createReducer(
  initialState,
  on(ReservationWizardActions.getCustomerByEmailSuccess, (state, action) => ({
    ...state,
    currentCustomer: action.customer,
  }))
);

export function reducer(state: ReservationWizardState, action: Action) {
  return reservationWizardReducer(state, action);
}
