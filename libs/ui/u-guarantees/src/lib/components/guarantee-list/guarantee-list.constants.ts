import { GuaranteeStatus, Select } from '@ivt/c-data';
import { IvtColumns } from '@ivt/u-ui';

export const columns: IvtColumns = [
  {
    label: '',
    prop: 'checkbox',
    sortable: false,
    colSizes: {
      xs: '1',
    },
  },
  {
    label: 'Folio',
    prop: 'guarantee.id',
    sortable: true,
    colSizes: {
      xs: '1',
    },
  },
  {
    label: 'Placa',
    prop: 'guarantee.vin',
    sortable: false,
  },
  {
    label: 'Distribuidor',
    prop: 'paymentOrder.distributor',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Inicio',
    prop: 'guarantee.startDate',
    sortable: true,
    colSizes: {
      xs: '2',
      lg: '1',
    },
  },
  {
    label: 'Fin',
    prop: 'guarantee.endDate',
    sortable: true,
    colSizes: {
      xs: '2',
      lg: '1',
    },
  },
  {
    label: 'Captura',
    prop: 'guarantee.createdAt',
    sortable: true,
    colSizes: {
      xs: '2',
      lg: '1',
    },
    breakpointShow: {
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Importe',
    prop: 'guarantee.amount',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    alignment: 'right',
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

export const dateTypeOptions: Select[] = [
  { label: 'Inicio', value: 'startDate' },
  { label: 'Fin', value: 'endDate' },
  { label: 'Captura', value: 'createdAt' },
];

export const statusOptions: Select[] = [
  {
    label: 'Pagada',
    value: GuaranteeStatus[GuaranteeStatus.paid],
  },
  {
    label: 'Pendiente de pago',
    value: GuaranteeStatus[GuaranteeStatus.outstanding],
  },
  {
    label: 'Cancelada',
    value: GuaranteeStatus[GuaranteeStatus.cancelled],
  },
  {
    label: 'Caducada',
    value: GuaranteeStatus[GuaranteeStatus.expired],
  },
];

