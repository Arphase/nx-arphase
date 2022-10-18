import { ApsColumns } from '@arphase/ui/core';
import { GuaranteeStatus, guaranteeStatusLabels } from '@innovatech/common/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export const columns: ApsColumns = [
  {
    label: 'VIN',
    prop: 'vehicle.vin',
    colSizes: {
      md: 4,
      lg: 4,
    },
  },
  {
    label: 'Compañía',
    prop: 'company.businessName',
    colSizes: {
      md: 6,
      lg: 4,
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
    label: guaranteeStatusLabels[GuaranteeStatus.paid],
    value: GuaranteeStatus[GuaranteeStatus.paid],
  },
  {
    label: guaranteeStatusLabels[GuaranteeStatus.outstanding],
    value: GuaranteeStatus[GuaranteeStatus.outstanding],
  },
  {
    label: guaranteeStatusLabels[GuaranteeStatus.cancelled],
    value: GuaranteeStatus[GuaranteeStatus.cancelled],
  },
  {
    label: guaranteeStatusLabels[GuaranteeStatus.expired],
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
