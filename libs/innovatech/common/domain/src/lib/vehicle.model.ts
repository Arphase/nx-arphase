import { Company } from './company.model';
import { Guarantee } from './guarantee.model';
import { RevisionRequest } from './revision-request.model';
import { Revision } from './revision.model';
import { User } from './user.model';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version?: string;
  year?: number;
  vin: string;
  motorNumber?: string;
  horsePower: number;
  status: VehicleStatus | string;
  companyId?: number;
  company?: Company;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  guarantees?: Guarantee[];
  revisions?: Revision[];
  revisionRequests?: RevisionRequest[];
}

export enum VehicleStatus {
  elegible = 1,
  needsRevision = 2,
  hasActiveGuarantee = 3,
  notElegible = 4,
  soldWidhoutGuarantee = 5,
}

export function isVehicleElegible(vehicle: Vehicle) {
  return (
    vehicle.status === VehicleStatus.elegible ||
    vehicle.status === VehicleStatus.hasActiveGuarantee ||
    vehicle.status === VehicleStatus[VehicleStatus.elegible] ||
    vehicle.status === VehicleStatus[VehicleStatus.hasActiveGuarantee]
  );
}

export const VEHICLE_VIN_LENGTH = 17;

export const vehicleStatusLabels: Record<string, string> = {
  [VehicleStatus[VehicleStatus.notElegible]]: 'No garantizable',
  [VehicleStatus[VehicleStatus.hasActiveGuarantee]]: 'Garantía vigente',
  [VehicleStatus[VehicleStatus.needsRevision]]: 'Necesita revisión',
  [VehicleStatus[VehicleStatus.elegible]]: 'Garantizable',
  [VehicleStatus[VehicleStatus.soldWidhoutGuarantee]]: 'Vendido sin garantía',
};
