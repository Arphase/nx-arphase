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
  role: userRole;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export enum userRole {
  superAdmin = 'superAdmin',
  agencyUser = 'agencyUser',
}
