import { GuaranteeStatus, Select } from '@ivt/c-data';
import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Nombre',
    prop: 'group.name',
    sortable: false,
  },
  {
    label: 'Contacto',
    prop: 'group.contact',
    sortable: false,
  },
  {
    label: 'Email',
    prop: 'group.email',
    sortable: false,
  },
  {
    label: 'Teléfono',
    prop: 'group.phone',
    sortable: false,
  },
  {
    label: 'Acciones',
    prop: 'actions',
    sortable: false,
    alignment: 'right',
    colSizes: {
      xs: 'auto',
    },
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
