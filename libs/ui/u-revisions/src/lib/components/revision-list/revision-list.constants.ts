import { ApsColumns } from '@arphase/ui';

export const columns: ApsColumns = [
    {
    label: 'VIN',
    prop: 'vehicle.vin',
    colSizes: {
      xs: 16,
      md: 8,
      lg: 4,
    },
  },
  {
    label: 'Marca',
    prop: 'vehicle.brand',
    colSizes: {
      md: 6,
      lg: 3,
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    colSizes: {
      lg: 3,
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    colSizes: {
      lg: 2,
    },
  },
  {
    label: 'Alta',
    prop: 'revision.createdAt',
    colSizes: {
      md: 6,
      lg: 4,
    },
  },
  {
    label: 'Observaciones',
    prop: 'revision.observations',
    colSizes: {
      lg: 6,
    },
  },
  {
    label: 'Estatus',
    prop: 'revision.status',
    colSizes: {
      xs: 8,
      md: 4,
      lg: 2,
    },
  },
];
