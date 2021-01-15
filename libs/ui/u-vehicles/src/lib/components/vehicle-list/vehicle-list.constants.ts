import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'VIN',
    prop: 'vehicle.vin',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Marca',
    prop: 'vehicle.brand',
    sortable: true,
    colSizes: {
      xs: '6',
      sm: '2',
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    sortable: true,
    colSizes: {
      xs: '5',
      sm: '2',
    },
  },
  {
    label: 'Versión',
    prop: 'vehicle.version',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    sortable: true,
    colSizes: {
      xs: '4',
      sm: '2',
      lg: '1'
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'vehicle.createdAt',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
    className: 'p-0',
  },
];
