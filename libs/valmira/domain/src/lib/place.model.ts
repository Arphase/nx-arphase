import { Category } from './category.model';

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
  category: Category;
  categoryId: number;
}
