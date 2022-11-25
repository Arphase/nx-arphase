import { Address } from '@arphase/common';

export interface SocialEvent {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  eventType?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  addressId?: number;
  address: Partial<Address>;
  eventPlace?: SocialEventPlaces;
  notes?: string;
  requiresAssembly?: boolean;
}

export enum SocialEventPlaces {
  backyard = 'backyard',
  garage = 'garage',
  garden = 'garden',
  terrace = 'terrace',
  office = 'office',
  inside = 'inside',
  eventHall = 'eventHall',
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
