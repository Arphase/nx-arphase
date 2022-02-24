export interface Customer {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
