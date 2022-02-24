import { Category } from './category.model';
import { Product } from './product.model';

export interface Subcategory {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  description: string;
  categoryId?: number;
  category?: Category;
  products?: Product[];
}
