import { ApsColumns } from '@arphase/ui';

export const columns: ApsColumns = [
  {
    label: 'Nombre',
    prop: 'group.name',
    colSizes: {
      xs: 24,
      md: 6,
    },
  },
  {
    label: 'Contacto',
    prop: 'group.contact',
    colSizes: {
      md: 5,
    },
  },
  {
    label: 'Email',
    prop: 'group.email',
    colSizes: {
      md: 5,
    },
  },
  {
    label: 'Teléfono',
    prop: 'group.phone',
    colSizes: {
      md: 8,
    },
  },
];
