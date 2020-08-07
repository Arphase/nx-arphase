import { IvtColumns, Select } from '@ivt/ui';

export const columns: IvtColumns = [
  {
    label: 'Folio',
    prop: 'id',
    sortable: true,
    colSize: 3,
  },
  {
    label: 'Fecha inicio',
    prop: 'startDate',
    sortable: true,
    colSize: 3,
  },
  {
    label: 'Fecha fin',
    prop: 'endDate',
    sortable: true,
    colSize: 3,
  },
  {
    label: 'Acciones',
    prop: 'actions',
    sortable: false,
    colSize: 3,
    alignment: 'right',
  },
];

export const dateTypeOptions: Select[] = [
  { label: 'Fecha inicio', value: 'startDate' },
  { label: 'Fecha fin', value: 'endDate' },
];
