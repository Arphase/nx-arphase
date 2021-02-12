import { GuaranteeStatus, Select } from '@ivt/c-data';
import { IvtColumns } from '@ivt/u-ui';

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


export const statusOptions: Select[] = [
  {
    label: 'Pagada',
    value: GuaranteeStatus[GuaranteeStatus.paid],
  },
  {
    label: 'Pendiente de pago',
    value: GuaranteeStatus[GuaranteeStatus.outstanding],
  },
  {
    label: 'Cancelada',
    value: GuaranteeStatus[GuaranteeStatus.cancelled],
  },
  {
    label: 'Caducada',
    value: GuaranteeStatus[GuaranteeStatus.expired],
  },
];
