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
  outstanding = 1,
  paid = 2,
  cancelled = 3,
  expired = 4,
}

