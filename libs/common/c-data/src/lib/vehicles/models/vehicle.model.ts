import { Company } from '../../companies/models/company.model';
import { Guarantee } from '../../guarantees';
import { RevisionRequest } from '../../revision-requests';
import { Revision } from '../../revisions';
import { User } from '../../users';
import { VehicleStatus } from '../enums';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version: string;
  year: number;
  vin: string;
  motorNumber: string;
  horsePower: number;
  status: VehicleStatus | string;
  companyId?: number;
  company?: Company;
  kilometrageStart?: number;
  kilometrageEnd?: number;
  productType?: string;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  guarantees?: Guarantee[];
  revisions?: Revision[];
  revisionRequests?: RevisionRequest[];
}
