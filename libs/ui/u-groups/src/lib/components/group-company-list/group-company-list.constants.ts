import { GuaranteeStatus, Select } from '@ivt/c-data';
import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Razón Social',
    prop: 'company.businessName',
    sortable: true,
  },
  {
    label: 'Contacto',
    prop: 'company.contact',
    sortable: false,
  },
  {
    label: 'Email',
    prop: 'company.email',
    sortable: true,
  },
  {
    label: 'RFC',
    prop: 'company.rfc',
    sortable: true,
  },
];

export const dateTypeOptions: Select[] = [
  { label: 'Inicio', value: 'startDate' },
  { label: 'Fin', value: 'endDate' },
  { label: 'Captura', value: 'createdAt' },
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
