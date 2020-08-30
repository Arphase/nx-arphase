import { Guarantee } from '../../guarantees';

export interface PaymentOrder {
  id?: number;
  createdAt: Date;
  distributor: string;
  guarantees: Guarantee[]
}
