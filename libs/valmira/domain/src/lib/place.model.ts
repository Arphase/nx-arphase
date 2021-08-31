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
