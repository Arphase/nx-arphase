import { Address } from '@arphase/common';

export interface SocialEvent {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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

export const socialEventLabels: Record<SocialEventPlaces, string> = {
  [SocialEventPlaces.backyard]: 'Patio',
  [SocialEventPlaces.garage]: 'Cochera',
  [SocialEventPlaces.garden]: 'Jardín',
  [SocialEventPlaces.terrace]: 'Terraza',
  [SocialEventPlaces.office]: 'Oficina',
  [SocialEventPlaces.inside]: 'Interior',
  [SocialEventPlaces.eventHall]: 'Salón',
};
