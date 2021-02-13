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
      lg: 4,
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    colSizes: {
      md: 5,
      lg: 3,
    },
  },
  {
    label: 'Versión',
    prop: 'vehicle.version',
    colSizes: {
      md: 5,
      lg: 3,
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    colSizes: {
      md: 2,
      lg: 2,
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'vehicle.createdAt',
    colSizes: {
      lg: 4,
    },
  },
  {
    label: 'Estatus',
    prop: 'vehicle.status',
    colSizes: {
      xs: 8,
      md: 4,
      lg: 4,
    },
  },
];
