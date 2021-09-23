import { Action, createReducer, on } from '@ngrx/store';

import * as ReservationWizardActions from './reservation-wizard.actions';
import { ReservationWizardState } from './reservation-wizard.state';

export const initialState: ReservationWizardState = {
  customer: null,
  promocode: null,
};

const reservationWizardReducer = createReducer(
  initialState,
  on(ReservationWizardActions.getCustomerByEmailSuccess, (state, action) => ({
    ...state,
    customer: action.customer,
  })),
  on(ReservationWizardActions.getPromocodeByNameSuccess, (state, action) => ({
    ...state,
    promocode: action.promocode,
  }))
);

export function reducer(state: ReservationWizardState, action: Action) {
  return reservationWizardReducer(state, action);
}
