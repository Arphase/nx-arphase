import { GuaranteeStatus } from '@ivt/data';

export const statusLabels: Record<GuaranteeStatus, string> = {
  [GuaranteeStatus.cancelled]: 'Cancelada',
  [GuaranteeStatus.expired]: 'Caducada',
  [GuaranteeStatus.outstanding]: 'Pendiente de pago',
  [GuaranteeStatus.paid]: 'Pagada',
};
export const backgroundClasses: Record<GuaranteeStatus, string> = {
  [GuaranteeStatus.cancelled]: 'bg-alert',
  [GuaranteeStatus.expired]: 'bg-info',
  [GuaranteeStatus.outstanding]: 'bg-warning',
  [GuaranteeStatus.paid]: 'bg-success',
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
