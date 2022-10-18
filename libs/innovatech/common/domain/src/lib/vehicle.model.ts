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
  status: VehicleStatus;
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
  elegible = 'elegible',
  needsRevision = 'needsRevision',
  hasActiveGuarantee = 'hasActiveGuarantee',
  notElegible = 'notElegible',
  soldWidhoutGuarantee = 'soldWidhoutGuarantee',
}

export function isVehicleElegible(vehicle: Vehicle) {
  return [
    VehicleStatus.elegible,
    VehicleStatus.hasActiveGuarantee,
    VehicleStatus.elegible,
    VehicleStatus.hasActiveGuarantee,
  ].includes(vehicle.status);
}

export const VEHICLE_VIN_LENGTH = 17;

export const vehicleStatusLabels: Record<VehicleStatus, string> = {
  [VehicleStatus.notElegible]: 'No garantizable',
  [VehicleStatus.hasActiveGuarantee]: 'Garantía vigente',
  [VehicleStatus.needsRevision]: 'Necesita revisión',
  [VehicleStatus.elegible]: 'Garantizable',
  [VehicleStatus.soldWidhoutGuarantee]: 'Vendido sin garantía',
};
