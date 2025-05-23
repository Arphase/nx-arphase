import { Company } from './company.model';

export interface Group {
  id?: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  companies: Company[];
  createdAt: Date;
  updatedAt: Date;
}
