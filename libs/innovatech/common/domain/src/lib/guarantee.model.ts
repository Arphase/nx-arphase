import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

import { Client } from './client.model';
import { Company } from './company.model';
import { PaymentOrder } from './payment-order.model';
import { Product } from './product.model';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';

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

export enum GuaranteeStatus {
  outstanding = 1,
  paid = 2,
  cancelled = 3,
  expired = 4,
}

export function transformFolio(value: number): unknown {
  const zeros = 5 - String(value).length;
  return `${new Array(zeros).join('0')}${value}`;
}

export const guaranteeStatusLabels: Record<string, string> = {
  [GuaranteeStatus[GuaranteeStatus.cancelled]]: 'Cancelada',
  [GuaranteeStatus[GuaranteeStatus.expired]]: 'Caducada',
  [GuaranteeStatus[GuaranteeStatus.outstanding]]: 'Pendiente de pago',
  [GuaranteeStatus[GuaranteeStatus.paid]]: 'Pagada',
};

export const guaranteeDateTypeOptions: NzSelectOptionInterface[] = [
  { label: 'Inicio', value: 'startDate' },
  { label: 'Fin', value: 'endDate' },
  { label: 'Captura', value: 'createdAt' },
];
