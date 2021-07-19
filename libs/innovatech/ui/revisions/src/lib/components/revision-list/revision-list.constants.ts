import { ApsColumns } from '@arphase/ui';
import { RevisionStatus } from '@innovatech/common/domain';

export const columns: ApsColumns = [
  {
    label: 'VIN',
    prop: 'vehicle.vin',
    colSizes: {
      xs: 16,
      md: 8,
      lg: 4,
    },
  },
  {
    label: 'Marca',
    prop: 'vehicle.brand',
    colSizes: {
      md: 6,
      lg: 3,
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    colSizes: {
      lg: 3,
    },
  },
  {
    label: 'Versión',
    prop: 'vehicle.version',
    colSizes: {
      lg: 2,
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    colSizes: {
      lg: 2,
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'revision.createdAt',
    colSizes: {
      md: 6,
      lg: 4,
    },
  },
  {
    label: 'Observaciones',
    prop: 'revision.observations',
    colSizes: {
      lg: 4,
    },
  },
  {
    label: 'Estatus',
    prop: 'revision.status',
    colSizes: {
      xs: 8,
      md: 4,
      lg: 2,
    },
  },
];

export const colorMaps: Record<RevisionStatus, string> = {
  [RevisionStatus.elegible]: 'success',
  [RevisionStatus.needsRepairs]: 'warning',
  [RevisionStatus.notElegible]: 'error',
};

export const iconMaps: Record<RevisionStatus, string> = {
  [RevisionStatus.elegible]: 'check-circle',
  [RevisionStatus.needsRepairs]: 'exclamation-circle',
  [RevisionStatus.notElegible]: 'close-circle',
};
