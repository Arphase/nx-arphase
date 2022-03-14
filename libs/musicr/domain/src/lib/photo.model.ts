export interface Photo {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  url: string;
  key: string;
  order?: number;
  productId?: number;
}
