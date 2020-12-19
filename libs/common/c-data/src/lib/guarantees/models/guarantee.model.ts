import { Client } from '../../clients/models/client.model';
import { PaymentOrder } from '../../payment-orders';
import { Product } from '../../product';
import { Vehicle } from '../../vehicles/models/vehicle.model';
import { GuaranteeStatus } from '../enums/guarantee-status.enum';

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
  invoiceNumber?: string;
  amount: number;
  paymentOrderId?: number;
  paymentOrder?: PaymentOrder;
  product?: Product;
}
