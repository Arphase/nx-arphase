import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Estatus',
    prop: 'revision.status',
    sortable: true,
    colSizes: {
      xs: '3',
    },
  },
  {
    label: 'Observaciones',
    prop: 'revision.observations',
    sortable: true,
    colSizes: {
      xs: '5',
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'revision.createdAt',
    sortable: true,
    colSizes: {
      xs: '3',
    },
  },
];
