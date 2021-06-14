import { Client } from '../../clients/models/client.model';
import { Company } from '../../companies';
import { PaymentOrder } from '../../payment-orders';
import { Product } from '../../product';
import { User } from '../../users';
import { Vehicle } from '../../vehicles/models/vehicle.model';
import { GuaranteeStatus } from '../enums/guarantee-status.enum';

export interface Guarantee {
  id: number;
  client: Client;
  vehicle: Vehicle;
  vehicleId: number;
  createdAt: Date;
  updatedAt: Date;
  status: GuaranteeStatus | string;
  startDate: Date;
  endDate: Date;
  invoiceDate: Date;
  kilometrageStart: number;
  kilometrageEnd: number;
  invoiceNumber?: string;
  amount: number;
  paymentOrderId?: number;
  paymentOrder?: PaymentOrder;
  product?: Product;
  companyId?: number;
  company?: Company;
  userId?: number;
  user?: User;
  checked?: boolean;
  productId?: number;
}
