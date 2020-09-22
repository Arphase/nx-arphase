import { GuaranteeStatus } from '../enums/guarantee-status.enum';

export const statusLabels: Record<string, string> = {
  [GuaranteeStatus[GuaranteeStatus.cancelled]]: 'Cancelada',
  [GuaranteeStatus[GuaranteeStatus.expired]]: 'Caducada',
  [GuaranteeStatus[GuaranteeStatus.outstanding]]: 'Pendiente de pago',
  [GuaranteeStatus[GuaranteeStatus.paid]]: 'Pagada',
};
