import { Guarantee } from '../../guarantees'

export interface Product {
  id?: number;
  price: number;
  template: string;
  name: string;
  logo: string;
  guarantees: Guarantee[];
}
