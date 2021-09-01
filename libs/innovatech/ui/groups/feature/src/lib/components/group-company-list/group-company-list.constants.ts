import { ApsColumns } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';

export const columns: ApsColumns = [
  {
    label: 'Razón Social',
    prop: 'company.businessName',
    colSizes: {
      xs: 24,
      md: 6,
    },
    sortFn: (a: Company, b: Company) => a.businessName.localeCompare(b.businessName),
  },
  {
    label: 'RFC',
    prop: 'company.rfc',
    colSizes: {
      md: 5,
    },
    sortFn: (a: Company, b: Company) => a.rfc.localeCompare(b.rfc),
  },
  {
    label: 'Contacto',
    prop: 'company.contact',
    colSizes: {
      md: 5,
    },
    sortFn: (a: Company, b: Company) => a.contact.localeCompare(b.contact),
  },
  {
    label: 'Email',
    prop: 'company.email',
    colSizes: {
      md: 8,
    },
    sortFn: (a: Company, b: Company) => a.email.localeCompare(b.email),
  },
];
