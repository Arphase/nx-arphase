import { Client } from './client.model';

export interface MoralPerson {
  id: number;
  client?: Client;
  businessName: string;
  constitutionDate: Date;
  distributor: string;
  adviser: string;
}
