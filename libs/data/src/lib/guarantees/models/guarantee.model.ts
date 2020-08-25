import { Client } from '../../clients/models/client.model';
import { Vehicle } from '../../vehicles/models/vehicle.model';
import { GuaranteeStatus } from '../enums/guarantee-status.enum';

export interface Guarantee {
  id: number;
  client: Client;
  vehicle: Vehicle;
  createdAt: Date;
  status: GuaranteeStatus | string;
  startDate: Date;
  endDate: Date;
  amount: number;
}


