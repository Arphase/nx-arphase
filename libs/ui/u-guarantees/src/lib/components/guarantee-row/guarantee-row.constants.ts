import { GuaranteeStatus } from '@ivt/c-data';

export const statusLabels: Record<string, string> = {
  [GuaranteeStatus[GuaranteeStatus.cancelled]]: 'Cancelada',
  [GuaranteeStatus[GuaranteeStatus.expired]]: 'Caducada',
  [GuaranteeStatus[GuaranteeStatus.outstanding]]: 'Pendiente de pago',
  [GuaranteeStatus[GuaranteeStatus.paid]]: 'Pagada',
};
export const backgroundClasses: Record<string, string> = {
  [GuaranteeStatus[GuaranteeStatus.cancelled]]: 'bg-alert',
  [GuaranteeStatus[GuaranteeStatus.expired]]: 'bg-info',
  [GuaranteeStatus[GuaranteeStatus.outstanding]]: 'bg-warning',
  [GuaranteeStatus[GuaranteeStatus.paid]]: 'bg-success',
};

export const menuOptions = [
  {
    class: 'bg-success',
    label: 'Pagada',
    value: GuaranteeStatus.paid,
  },
  {
    class: 'bg-warning',
    label: 'Pendiente',
    value: GuaranteeStatus.outstanding,
  },
  {
    class: 'bg-alert',
    label: 'Cancelada',
    value: GuaranteeStatus.cancelled,
  },
  {
    class: 'bg-info',
    label: 'Caducada',
    value: GuaranteeStatus.expired,
  },
];
