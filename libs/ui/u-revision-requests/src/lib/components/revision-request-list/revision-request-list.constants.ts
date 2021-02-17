import { ApsColumns } from '@arphase/ui';
import { RevisionRequestStatus } from '@ivt/c-data';

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
      lg: 5
    },
  },
  {
    label: 'Teléfono',
    prop: 'revisionRequest.phone',
    colSizes: {
      md: 7,
      lg: 6,
    },
  },
  {
    label: 'Correo',
    prop: 'revisionRequest.email',
    colSizes: {
      lg: 6,
    },
  },
  {
    label: 'Estatus',
    prop: 'guarantee.status',
    colSizes: {
      xs: 10,
      md: 4,
      lg: 3,
    },
  },
];
