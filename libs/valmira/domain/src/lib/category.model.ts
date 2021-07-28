import { Place } from './place.model';

export interface Category {
  id?: number;
  name: string;
  places?: Place[];
}
