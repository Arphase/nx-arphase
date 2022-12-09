import { Photo } from './photo.model';
import { Subcategory } from './subcategory.model';

export interface Category {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  description: string;
  subcategories?: Subcategory[];
  photoId?: number;
  photo?: Photo;
}
