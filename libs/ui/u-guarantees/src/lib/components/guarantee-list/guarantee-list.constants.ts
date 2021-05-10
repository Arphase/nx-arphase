import { ApsColumns } from '@arphase/ui';
import { GuaranteeStatus } from '@ivt/c-data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

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
    flex: 'auto',
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
      lg: 3,
    },
  },
  {
    label: 'Captura',
    prop: 'guarantee.createdAt',
    colSizes: {
      lg: 2,
    },
  },
  {
    label: 'Estatus',
    prop: 'guarantee.status',
    colSizes: {
      xs: 12,
      md: 4,
    },
  },
];

export const statusOptions: NzSelectOptionInterface[] = [
  {
    label: 'Pagada',
    value: GuaranteeStatus[GuaranteeStatus.paid],
  },
  {
    label: 'Pendiente',
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
