import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Observaciones',
    prop: 'revision.observations',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
  {
    label: 'VIN',
    prop: 'vehicle.vin',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
  {
    label: 'Marca',
    prop: 'vehicle.brand',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
  {
    label: 'Alta',
    prop: 'revision.createdAt',
    sortable: true,
    colSizes: {
      xs: '2',
    },
  },
];
