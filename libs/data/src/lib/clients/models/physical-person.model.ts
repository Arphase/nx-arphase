import { Client } from './client.model';

export interface PhysicalPerson {
  id: number;
  client?: Client;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: Date;
}
