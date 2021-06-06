import { Address } from '../models';

export function formatAddress(address: Address): string {
  const { street, externalNumber, suburb, city, state, zipcode } = address;
  return `${street} ${externalNumber}, ${suburb}. ${city}, ${state}. ${zipcode}`;
}
