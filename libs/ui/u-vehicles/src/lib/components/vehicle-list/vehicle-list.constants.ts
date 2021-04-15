import { ApsColumns } from '@arphase/ui';
import { VehicleStatus } from '@ivt/c-data';
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
  [VehicleStatus.soldWidhoutGuarantee]: 'default',
};
export const iconMaps: Record<VehicleStatus, string> = {
  [VehicleStatus.elegible]: 'check-circle',
  [VehicleStatus.needsRevision]: 'exclamation-circle',
  [VehicleStatus.notElegible]: 'close-circle',
  [VehicleStatus.hasActiveGuarantee]: 'sync',
  [VehicleStatus.soldWidhoutGuarantee]: 'fall',
};
export const statusLabels: Record<string, string> = {
  [VehicleStatus[VehicleStatus.notElegible]]: 'No garantizable',
  [VehicleStatus[VehicleStatus.hasActiveGuarantee]]: 'Garantía vigente',
  [VehicleStatus[VehicleStatus.needsRevision]]: 'Necesita revisión',
  [VehicleStatus[VehicleStatus.elegible]]: 'Garantizable',
  [VehicleStatus[VehicleStatus.soldWidhoutGuarantee]]: 'Vendido sin garantía',
};

export const statusOptions: NzSelectOptionInterface[] = [
  {
    label: statusLabels[VehicleStatus[VehicleStatus.elegible]],
    value: VehicleStatus[VehicleStatus.elegible],
  },
  {
    label: statusLabels[VehicleStatus[VehicleStatus.hasActiveGuarantee]],
    value: VehicleStatus[VehicleStatus.hasActiveGuarantee],
  },
  {
    label: statusLabels[VehicleStatus[VehicleStatus.needsRevision]],
    value: VehicleStatus[VehicleStatus.needsRevision],
  },
  {
    label: statusLabels[VehicleStatus[VehicleStatus.notElegible]],
    value: VehicleStatus[VehicleStatus.notElegible],
  },
  {
    label: statusLabels[VehicleStatus[VehicleStatus.soldWidhoutGuarantee]],
    value: VehicleStatus[VehicleStatus.soldWidhoutGuarantee],
  },
];
