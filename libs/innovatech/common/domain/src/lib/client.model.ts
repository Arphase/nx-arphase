import { Address } from './address.model';
import { MoralPerson } from './moral-person.model';
import { PhysicalPerson } from './physical-person.model';

export interface Client {
  id: number;
  personType: PersonTypes | string;
  physicalInfo?: PhysicalPerson;
  moralInfo?: MoralPerson;
  rfc: string;
  phone: string;
  email: string;
  addressId?: number;
  address: Address;
  salesPlace: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PersonTypes {
  physical = 1,
  moral = 2,
}
