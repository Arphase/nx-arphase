import { Company } from '../../companies/models/company.model';
import { User } from '../../users';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  version: string;
  year: number;
  vin: string;
  motorNumber: string;
  horsePower: number;
  companyId?: number;
  company?: Company;
  kilometrageStart?: number;
  kilometrageEnd?: number;
  productType?: string;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}
