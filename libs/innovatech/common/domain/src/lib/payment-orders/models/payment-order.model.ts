import { Guarantee } from '../../guarantees';

export interface PaymentOrder {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  guarantees: Guarantee[]
}
