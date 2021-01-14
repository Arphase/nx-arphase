import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Nombre',
    prop: 'group.name',
    sortable: true,
    colSizes: {
      xs: '9',
      sm: '3'
    },
  },
  {
    label: 'Contacto',
    prop: 'group.contact',
    sortable: true,
    colSizes: {
      xs: '3',
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Email',
    prop: 'group.email',
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
    label: 'Teléfono',
    prop: 'group.phone',
    sortable: true,
    colSizes: {
      xs: '2'
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
  }
];
