import { ApsColumns } from '@arphase/ui';
import { RevisionRequestStatus } from '@ivt/c-data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export const statusLabels: Record<RevisionRequestStatus, string> = {
  [RevisionRequestStatus.completed]: 'Completada',
  [RevisionRequestStatus.inProgress]: 'En proceso',
  [RevisionRequestStatus.new]: 'Nueva',
};

export const iconMaps: Record<RevisionRequestStatus, string> = {
  [RevisionRequestStatus.completed]: 'check-circle',
  [RevisionRequestStatus.inProgress]: 'sync',
  [RevisionRequestStatus.new]: 'exclamation-circle',
};

export const colorMaps: Record<RevisionRequestStatus, string> = {
  [RevisionRequestStatus.completed]: 'success',
  [RevisionRequestStatus.inProgress]: 'warning',
  [RevisionRequestStatus.new]: 'processing',
};

export const statusOptions: NzSelectOptionInterface[] = [
  {
    label: 'Completada',
    value: RevisionRequestStatus[RevisionRequestStatus.completed],
  },
  {
    label: 'En proceso',
    value: RevisionRequestStatus[RevisionRequestStatus.inProgress],
  },
  {
    label: 'Nueva',
    value: RevisionRequestStatus[RevisionRequestStatus.new],
  },
];

export const columns: ApsColumns = [
  {
    label: 'VIN',
    prop: 'vehicle.vin',
    colSizes: {
      xs: 14,
      md: 6,
      lg: 4,
    },
  },
  {
    label: 'Contacto',
    prop: 'revisionRequest.name',
    colSizes: {
      md: 7,
      lg: 4,
    },
  },
  {
    label: 'Teléfono',
    prop: 'revisionRequest.phone',
    colSizes: {
      md: 7,
      lg: 5,
    },
  },
  {
    label: 'Correo',
    prop: 'revisionRequest.email',
    colSizes: {
      lg: 5,
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'revisionRequest.email',
    colSizes: {
      lg: 3,
    },
  },
  {
    label: 'Estatus',
    prop: 'revisionRequest.status',
    colSizes: {
      xs: 10,
      md: 4,
      lg: 3,
    },
  },
];
