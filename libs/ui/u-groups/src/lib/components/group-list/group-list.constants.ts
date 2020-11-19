import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Nombre',
    prop: 'group.name',
    sortable: false,
  },
  {
    label: 'Contacto',
    prop: 'group.contact',
    sortable: false,
  },
  {
    label: 'Email',
    prop: 'group.email',
    sortable: false,
  },
  {
    label: 'Teléfono',
    prop: 'group.phone',
    sortable: false,
  },
  {
    label: 'Acciones',
    prop: 'actions',
    sortable: false,
    alignment: 'right',
    colSizes: {
      xs: 'auto',
    },
  },
];
