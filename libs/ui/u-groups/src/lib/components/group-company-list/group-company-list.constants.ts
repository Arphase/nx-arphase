import { ApsColumns } from '@arphase/ui';

export const columns: ApsColumns = [
  {
    label: 'Razón Social',
    prop: 'company.businessName',
    colSizes: {
      xs: 24,
      md: 6,
    },
  },
  {
    label: 'RFC',
    prop: 'company.rfc',
    colSizes: {
      md: 5,
    },
  },
  {
    label: 'Contacto',
    prop: 'company.contact',
    colSizes: {
      md: 5,
    },
  },
  {
    label: 'Email',
    prop: 'company.email',
    colSizes: {
      md: 8,
    },
  },
];
