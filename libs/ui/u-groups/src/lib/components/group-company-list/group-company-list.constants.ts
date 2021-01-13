import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: 'Razón Social',
    prop: 'company.businessName',
    sortable: false,
    colSizes: {
      xs: '8',
      md: '3',
    }
  },
  {
    label: 'Contacto',
    prop: 'company.contact',
    sortable: false,
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
    label: 'Email',
    prop: 'company.email',
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
    label: 'RFC',
    prop: 'company.rfc',
    sortable: false,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      md: true,
      lg: true,
      xl: true,
    },
  },
];
