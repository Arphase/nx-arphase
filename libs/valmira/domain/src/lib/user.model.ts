export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
}

export enum UserRoles {
  superAdmin = 1,
  admin = 2,
}
