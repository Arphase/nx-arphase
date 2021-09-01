import { ReservationAdditionalProduct } from './reservation-additional-product.model';

export interface AdditionalProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  additionalProducts?: ReservationAdditionalProduct[];
}
