import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Razón Social',
    prop: 'company.businessName',
    sortable: false,
  },
  {
    label: 'Contacto',
    prop: 'company.contact',
    sortable: false,
  },
  {
    label: 'Email',
    prop: 'company.email',
    sortable: false,
  },
  {
    label: 'RFC',
    prop: 'company.rfc',
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
