import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

import { Guarantee } from './guarantee.model';

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

export const glossary: NzSelectOptionInterface[] = [
  { label: 'Nombre del cliente - {guarantee.client.name}', value: '{guarantee.client.name}' },
  { label: 'RFC del cliente - {guarantee.client.rfc}', value: '{guarantee.client.rfc}' },
  { label: 'Telefono del cliente - {guarantee.client.phone}', value: '{guarantee.client.phone}' },
  { label: 'Correo del cliente - {guarantee.client.email}', value: '{guarantee.client.email}' },
  { label: 'Dirección del cliente - {guarantee.client.address}', value: '{guarantee.client.address}' },
  { label: 'Punto de venta - {guarantee.client.salesPlace}', value: '{guarantee.client.salesPlace}' },

  { label: 'Marca del vehículo - {guarantee.vehicle.brand}', value: '{guarantee.vehicle.brand}' },
  { label: 'Modelo del vehículo - {guarantee.vehicle.model}', value: '{guarantee.vehicle.model}' },
  { label: 'Versión del vehículo - {guarantee.vehicle.version}', value: '{guarantee.vehicle.version}' },
  { label: 'Año del vehículo - {guarantee.vehicle.year}', value: '{guarantee.vehicle.year}' },
  { label: 'VIN - {guarantee.vehicle.vin}', value: '{guarantee.vehicle.vin}' },
  { label: 'Caballos de fuerza - {guarantee.vehicle.horsePower}', value: '{guarantee.vehicle.horsePower}' },
  { label: 'Número de motor - {guarantee.vehicle.motorNumber}', value: '{guarantee.vehicle.motorNumber}' },

  { label: 'Folio - {guarantee.id}', value: '{guarantee.id}' },
  { label: 'Kilometraje inicial - {guarantee.kilometrageStart}', value: '{guarantee.kilometrageStart}' },
  { label: 'Kilometraje final - {guarantee.kilometrageEnd}', value: '{guarantee.kilometrageEnd}' },
  { label: 'Fecha inicial - {guarantee.startDate}', value: '{guarantee.startDate}' },
  { label: 'Fecha final - {guarantee.endDate}', value: '{guarantee.endDate}' },
];
