import { Client } from './client.model';

export interface PhysicalPerson {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: Date;
  client?: Client;
}
