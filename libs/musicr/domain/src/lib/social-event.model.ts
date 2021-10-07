import { Address } from '@arphase/common';

export interface SocialEvent {
  id?: number;
  name: string;
  eventType: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  addressId?: number;
  address: Address;
  eventPlace: SocialEventPlaces | string;
  notes?: string;
  requiresAssembly: boolean;
}

export enum SocialEventPlaces {
  backyard = 1,
  garage = 2,
  garden = 3,
  terrace = 4,
  office = 5,
  inside = 6,
  eventHall = 7,
}
