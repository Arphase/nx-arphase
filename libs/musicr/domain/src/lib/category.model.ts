import { Subcategory } from './subcategory.model';

export interface Category {
  id?: number;
  name: string;
  subcategories?: Subcategory[];
}
