import { Company } from '../../companies/models/company.model';

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
}
