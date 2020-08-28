import { GuaranteeStatus, Select } from '@ivt/data';
import { IvtColumns } from '@ivt/ui';

export const columns: IvtColumns = [
  {
    label: '',
    prop: 'checkbox',
    sortable: false,
    colSize: 1,
  },
  {
    label: 'Folio',
    prop: 'id',
    sortable: true,
    colSize: 1,
  },
  {
    label: 'Placa',
    prop: 'vin',
    sortable: false,
    colSize: 2,
  },
  {
    label: 'Fecha inicio',
    prop: 'startDate',
    sortable: true,
    colSize: 2,
  },
  {
    label: 'Fecha fin',
    prop: 'endDate',
    sortable: true,
    colSize: 2,
  },
  {
    label: 'Importe',
    prop: 'amount',
    sortable: true,
    colSize: 2,
    alignment: 'right',
  },
  {
    label: 'Acciones',
    prop: 'actions',
    sortable: false,
    colSize: 2,
    alignment: 'right',
  },
];

export const dateTypeOptions: Select[] = [
  { label: 'Fecha inicio', value: 'startDate' },
  { label: 'Fecha fin', value: 'endDate' },
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
