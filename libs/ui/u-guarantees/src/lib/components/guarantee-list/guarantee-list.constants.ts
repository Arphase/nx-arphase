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
      md: '1',
      xs: '2',
      sm: '2',
    },
  },
  {
    label: 'VIN',
    prop: 'guarantee.vin',
    sortable: false,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Distribuidor',
    prop: 'paymentOrder.distributor',
    sortable: true,
    colSizes: {
      xs: '2',
    },
    breakpointShow: {
      sm: true,
      md: true,
      lg: true,
      xl: true,
    },
  },
  {
    label: 'Inicio',
    prop: 'guarantee.startDate',
    sortable: true,
    colSizes: {
      xs: '3',
      sm: '2',
      lg: '1',
    },
  },
  {
    label: 'Fin',
    prop: 'guarantee.endDate',
    sortable: true,
    colSizes: {
      xs: '3',
      sm: '2',
      lg: '1',
    },
  },
  {
    label: 'Factura',
    prop: 'guarantee.invoiceNumber',
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
    breakpointShow: {
      sm: true,
      md: true,
      lg: true,
      xl: true,
    },
  }
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
