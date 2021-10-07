import { Photo } from './photo.model';
import { Reservation } from './reservation.model';

export interface Place {
  id?: number;
  name: string;
  description: string;
  capacity: number;
  area: number;
  services: string[];
  weeklyPrice: number;
  weekendPrice: number;
  rooms: number;
  beds: number;
  active: boolean;
  category: PlaceCategories | string;
  photos?: Photo[];
  reservations?: Reservation[];
}

export enum PlaceCategories {
  premium = 1,
  couple = 2,
  kids = 3,
}

export const categoryLabels: Record<string, string> = {
  [PlaceCategories[PlaceCategories.premium]]: 'Premium',
  [PlaceCategories[PlaceCategories.couple]]: 'Pareja',
  [PlaceCategories[PlaceCategories.kids]]: 'Niños',
};

export interface PlaceCountByCategory {
  status: PlaceCategories;
  amount: number;
}

export type PlaceCategorySummary = PlaceCountByCategory[];
