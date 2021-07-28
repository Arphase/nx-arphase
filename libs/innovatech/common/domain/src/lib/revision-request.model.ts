import { Address } from './address.model';
import { Company } from './company.model';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export interface RevisionRequest {
  id?: number;
  addressId: number;
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: RevisionRequestStatus | string;
  additionalNotes: string;
  userId: number;
  user: User;
  companyId: number;
  company: Company;
  vehicleId: number;
  vehicle: Vehicle;
  address: Address;
}

export enum RevisionRequestStatus {
  new = 1,
  inProgress = 2,
  completed = 3,
}
