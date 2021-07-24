import { Address } from './address.model';

export interface SocialEvent {
  id: number;
  name: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  addressId?: number;
  address: Address;
  eventPlace: string;
  notes: string;
  requiresAssembly: boolean;
}
