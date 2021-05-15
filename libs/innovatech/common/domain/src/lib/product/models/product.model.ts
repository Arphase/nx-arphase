import { Guarantee } from '../../guarantees'

export interface Product {
  id?: number;
  price: number;
  template: string;
  name: string;
  logo: string;
  minYear: number;
  maxYear: number;
  minHp: number;
  maxHp: number;
  guarantees?: Guarantee[];
  createdAt?: Date;
  updatedAt?: Date;
}
