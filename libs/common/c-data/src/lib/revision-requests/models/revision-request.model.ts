import { Address } from '../../address/models/address.model';
import { Company } from '../../companies';
import { User } from '../../users';
import { Vehicle } from '../../vehicles';
import { RevisionRequestStatus } from '../enums/revision-request-status.enum';

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
