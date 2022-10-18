import { Company } from './company.model';
import { Guarantee } from './guarantee.model';
import { RevisionRequest } from './revision-request.model';
import { Vehicle } from './vehicle.model';

export interface User {
  id?: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName: string;
  email: string;
  phone?: string;
  password?: string;
  salt?: string;
  token?: string;
  role: UserRoles;
  company?: Company;
  companyId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  guarantees?: Guarantee[];
  vehicles?: Vehicle[];
  revisionRequests?: RevisionRequest[];
}

export enum UserRoles {
  superAdmin = 'superAdmin',
  admin = 'admin',
  agencyUser = 'agencyUser',
  repairman = 'repairman',
}

export function hasAccessToAllData(role: UserRoles): boolean {
  return [UserRoles.superAdmin, UserRoles.repairman].includes(role);
}
