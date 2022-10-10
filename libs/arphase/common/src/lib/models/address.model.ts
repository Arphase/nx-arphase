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

export function formatAddress(address: Partial<Address>): string {
  const { street, externalNumber, suburb, city, state, zipcode } = address;
  return street ? `${street} ${externalNumber}, ${suburb}. ${city}, ${state}. ${zipcode}` : `CP. ${zipcode}`;
}
