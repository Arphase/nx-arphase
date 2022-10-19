import { ApsColumns } from '@arphase/ui/core';
import { VehicleStatus, vehicleStatusLabels } from '@innovatech/common/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

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
    label: 'Compañía',
    prop: 'company.businessName',
    colSizes: {
      xs: 0,
      md: 5,
      lg: 4,
    },
  },
  {
    label: 'Marca',
    prop: 'vehicle.brand',
    colSizes: {
      lg: 3,
    },
  },
  {
    label: 'Modelo',
    prop: 'vehicle.model',
    colSizes: {
      md: 5,
      lg: 3,
    },
  },
  {
    label: 'Año',
    prop: 'vehicle.year',
    colSizes: {
      md: 2,
      lg: 2,
    },
  },
  {
    label: 'Fecha de alta',
    prop: 'vehicle.createdAt',
    colSizes: {
      lg: 4,
    },
  },
  {
    label: 'Estatus',
    prop: 'vehicle.status',
    colSizes: {
      xs: 8,
      md: 4,
      lg: 4,
    },
  },
];

export const colorMaps: Record<VehicleStatus, string> = {
  [VehicleStatus.elegible]: 'success',
  [VehicleStatus.needsRevision]: 'warning',
  [VehicleStatus.notElegible]: 'error',
  [VehicleStatus.hasActiveGuarantee]: 'processing',
  [VehicleStatus.soldWithoutGuarantee]: 'default',
};

export const iconMaps: Record<VehicleStatus, string> = {
  [VehicleStatus.elegible]: 'check-circle',
  [VehicleStatus.needsRevision]: 'exclamation-circle',
  [VehicleStatus.notElegible]: 'close-circle',
  [VehicleStatus.hasActiveGuarantee]: 'sync',
  [VehicleStatus.soldWithoutGuarantee]: 'fall',
};

export const statusOptions: NzSelectOptionInterface[] = [
  {
    label: vehicleStatusLabels[VehicleStatus.elegible],
    value: VehicleStatus.elegible,
  },
  {
    label: vehicleStatusLabels[VehicleStatus.hasActiveGuarantee],
    value: VehicleStatus.hasActiveGuarantee,
  },
  {
    label: vehicleStatusLabels[VehicleStatus.needsRevision],
    value: VehicleStatus.needsRevision,
  },
  {
    label: vehicleStatusLabels[VehicleStatus.notElegible],
    value: VehicleStatus.notElegible,
  },
  {
    label: vehicleStatusLabels[VehicleStatus.soldWithoutGuarantee],
    value: VehicleStatus.soldWithoutGuarantee,
  },
];
