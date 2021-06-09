import { Company } from '../../companies';
import { Guarantee } from '../../guarantees';
import { RevisionRequest } from '../../revision-requests';
import { Vehicle } from '../../vehicles';
import { UserRoles } from '../enums/user-roles.enum';

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
