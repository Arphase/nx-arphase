export interface Address {
  id?: number;
  zipcode: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  street: string;
  externalNumber: string;
  internalNumber?: string;
}
