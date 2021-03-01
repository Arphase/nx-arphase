import { ApsColumns } from '@arphase/ui';

export const columns: ApsColumns = [
  {
    label: 'Nombre',
    prop: 'user.firstName',
    colSizes: {
      xs: 12,
      md: 6,
    },
  },
  {
    label: 'Correo',
    prop: 'user.email',
    colSizes: {
      xs: 12,
      md: 6,
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'user.createdAt',
    colSizes: {
      md: 6,
    },
  },
  {
    label: 'Compañía',
    prop: 'company.businessName',
    colSizes: {
      md: 6,
    },
  },
];
