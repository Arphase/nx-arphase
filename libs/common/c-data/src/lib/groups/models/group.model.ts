import { Company } from "../../companies/models/company.model";

export interface Group {
  id?: number;
  groupName: string;
  contact: string;
  email: string;
  phone: string;
  companies: Company[];
}

