import { IvtColumns, Select } from '@ivt/ui';

export const columns: IvtColumns = [
  {
    label: 'Folio',
    prop: 'id',
    sortable: true,
    colSize: 2,
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
