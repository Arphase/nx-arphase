import { Client } from '../../clients/models/client.model';
import { Vehicle } from '../../vehicles/models/vehicle.model';

export interface Guarantee {
  id: number;
  client: Client;
  vehicle: Vehicle;
  createdAt: Date;
  status: GuaranteeStatus;
  paymentOrder: string;
  startDate: Date;
  endDate: Date;
  amount: number;
}

export enum GuaranteeStatus {
  outstanding = 'outstanding',
  paid = 'paid',
  cancelled = 'cancelled',
  expired = 'expired',
}

