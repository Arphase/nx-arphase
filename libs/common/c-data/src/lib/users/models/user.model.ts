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
  role: UserRole;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export enum UserRole {
  superAdmin = 'superAdmin',
  agencyUser = 'agencyUser',
}
