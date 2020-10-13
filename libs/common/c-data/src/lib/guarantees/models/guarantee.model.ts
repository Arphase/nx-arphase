import { Client } from '../../clients/models/client.model';
import { Vehicle } from '../../vehicles/models/vehicle.model';
import { GuaranteeStatus } from '../enums/guarantee-status.enum';
import { PaymentOrder } from '../../payment-orders';

export interface Guarantee {
  id: number;
  client: Client;
  vehicle: Vehicle;
  createdAt: Date;
  updatedAt: Date;
  status: GuaranteeStatus | string;
  startDate: Date;
  endDate: Date;
  invoiceDate: Date;
  amount: number;
  paymentOrderId?: number;
  paymentOrder?: PaymentOrder;
}


