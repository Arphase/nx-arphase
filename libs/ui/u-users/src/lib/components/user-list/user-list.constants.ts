import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Nombre',
    prop: 'user.firstName',
    sortable: true,
    colSizes: {
      xs: '6',
      sm: '3',
    },
  },
  {
    label: 'Correo',
    prop: 'user.email',
    sortable: true,
    colSizes: {
      xs: '6',
      sm: '3',
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'user.createdAt',
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
    label: 'Compañía',
    prop: 'company.businessName',
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
];
