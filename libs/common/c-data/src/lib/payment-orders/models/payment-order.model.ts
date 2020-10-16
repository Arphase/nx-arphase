import { Guarantee } from '../../guarantees';

export interface PaymentOrder {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  distributor: string;
  guarantees: Guarantee[]
}
