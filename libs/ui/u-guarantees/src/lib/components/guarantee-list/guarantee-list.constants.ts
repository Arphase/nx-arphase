import { ApsColumns } from '@arphase/ui';
import { GuaranteeStatus, Select } from '@ivt/c-data';

export const columns: ApsColumns = [
  {
    label: 'Folio',
    prop: 'guarantee.id',
    colSizes: {
      xs: 8,
      md: 4,
      lg: 2,
    },
  },
  {
    label: 'VIN',
    prop: 'guarantee.vin',
    colSizes: {
      md: 6,
      lg: 4,
    },
  },
  {
    label: 'Compañía',
    prop: 'company.businessName',
    colSizes: {
      md: 4
    },
  },
  {
    label: 'Factura',
    prop: 'guarantee.invoiceNumber',
    colSizes: {
      md: 4,
      lg: 3,
    },
  },
  {
    label: 'Producto',
    prop: 'guarantee.productType',
    colSizes: {
      lg: 4,
    },
  },
  {
    label: 'Estatus',
    prop: 'guarantee.status',
    colSizes: {
      xs: 12,
      md: 4,
      lg: 5,
    },
  },
];

export const menuOptions = [
  {
    class: 'bg-success',
    label: 'Pagada',
    value: GuaranteeStatus.paid,
  },
  {
    class: 'bg-warning',
    label: 'Pendiente',
    value: GuaranteeStatus.outstanding,
  },
  {
    class: 'bg-alert',
    label: 'Cancelada',
    value: GuaranteeStatus.cancelled,
  },
  {
    class: 'bg-info',
    label: 'Caducada',
    value: GuaranteeStatus.expired,
  },
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

export const colorMaps: Record<GuaranteeStatus, string> = {
  [GuaranteeStatus.paid]: 'success',
  [GuaranteeStatus.outstanding]: 'warning',
  [GuaranteeStatus.cancelled]: 'error',
  [GuaranteeStatus.expired]: 'processing',
};
export const iconMaps: Record<GuaranteeStatus, string> = {
  [GuaranteeStatus.paid]: 'check-circle',
  [GuaranteeStatus.outstanding]: 'exclamation-circle',
  [GuaranteeStatus.cancelled]: 'close-circle',
  [GuaranteeStatus.expired]: 'sync',
};
