import { Guarantee } from './guarantee.model';

export interface PaymentOrder {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  guarantees: Guarantee[];
}
