import { Company } from '../../companies';
import { UserRoles } from '../enums/user-roles.enum';

export interface User {
  id?: number;
  rfc?: string;
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
}
