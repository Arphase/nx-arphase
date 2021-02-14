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
    prop: 'vehicle.vin',
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
    label: 'Importe',
    prop: 'guarantee.amount',
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
    type: 'success',
    label: 'Pagada',
    value: GuaranteeStatus.paid,
  },
  {
    type: 'warning',
    label: 'Pendiente',
    value: GuaranteeStatus.outstanding,
  },
  {
    type: 'error',
    label: 'Cancelada',
    value: GuaranteeStatus.cancelled,
  },
  {
    type: 'info',
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
