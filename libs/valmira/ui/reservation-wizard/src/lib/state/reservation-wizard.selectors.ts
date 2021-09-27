import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReservationWizardState } from './reservation-wizard.state';

const getReservationWizardFeatureState = createFeatureSelector<ReservationWizardState>('reservationWizard');

export const getReservationWizardState = createSelector(getReservationWizardFeatureState, state => state);

export const getReservationWizardCustomer = createSelector(getReservationWizardFeatureState, state => state.customer);

export const getReservationWizardPromocode = createSelector(getReservationWizardFeatureState, state => state.promocode);
