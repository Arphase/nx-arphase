import { Place } from './place.model';

export interface Photo {
  id?: number;
  path: string;
  key: string;
  place?: Place;
  placeId?: number;
}
