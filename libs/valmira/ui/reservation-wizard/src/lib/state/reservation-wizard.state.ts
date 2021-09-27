import { Customer, Promocode } from '@valmira/domain';

export interface ReservationWizardState {
  customer: Customer;
  promocode: Promocode;
}
