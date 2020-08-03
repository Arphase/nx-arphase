import { Address } from '../../address/model/address.model';
import { MoralPerson } from './moral-person.model';
import { PhysicalPerson } from './physical-person.model';

export interface Client {
  id: number;
  personType: string;
  physicalInfo: PhysicalPerson;
  moralInfo: MoralPerson;
  rfc: string;
  phone: string;
  email: string;
  addressId: number;
  address: Address;
  salesPlace : string;
}
