import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Nombre',
    prop: 'group.name',
    sortable: false,
    colSizes: {
      xs: '3'
    }
  },
  {
    label: 'Contacto',
    prop: 'group.contact',
    sortable: false,
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
    sortable: false,
    colSizes: {
      xs: '3',
      md: '2'
    },
  },
  {
    label: 'Teléfono',
    prop: 'group.phone',
    sortable: false,
    colSizes: {
      xs: '3',
      md: '2'
    },
  },
  {
    label: 'Acciones',
    prop: 'actions',
    sortable: false,
    alignment: 'right'
  },
];
