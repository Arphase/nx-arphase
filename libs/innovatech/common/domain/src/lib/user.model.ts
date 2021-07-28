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
  role: UserRoles | string;
  company?: Company;
  companyId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  guarantees?: Guarantee[];
  vehicles?: Vehicle[];
  revisionRequests?: RevisionRequest[];
}

export enum UserRoles {
  superAdmin = 1,
  admin = 2,
  agencyUser = 3,
  repairman = 4,
}

export function hasAccessToAllData(role: UserRoles | string): boolean {
  return [UserRoles.superAdmin, UserRoles.repairman].includes(UserRoles[role as keyof typeof UserRoles]);
}
