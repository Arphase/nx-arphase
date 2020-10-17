import { UserRoles } from '../enums/user-roles.enum';

export interface User {
  id?: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password?: string;
  salt?: string;
  token?: string;
  role: UserRoles | string;
}

