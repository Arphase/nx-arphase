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

export const eventPlaceOptions: { label: string; value: string }[] = [
  {
    label: socialEventLabels[SocialEventPlaces.garage],
    value: SocialEventPlaces.garage,
  },
  {
    label: socialEventLabels[SocialEventPlaces.inside],
    value: SocialEventPlaces.inside,
  },
  {
    label: socialEventLabels[SocialEventPlaces.garden],
    value: SocialEventPlaces.garden,
  },
  {
    label: socialEventLabels[SocialEventPlaces.office],
    value: SocialEventPlaces.office,
  },
  {
    label: socialEventLabels[SocialEventPlaces.backyard],
    value: SocialEventPlaces.backyard,
  },
  {
    label: socialEventLabels[SocialEventPlaces.eventHall],
    value: SocialEventPlaces.eventHall,
  },
  {
    label: socialEventLabels[SocialEventPlaces.terrace],
    value: SocialEventPlaces.terrace,
  },
];
