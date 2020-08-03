import { Client } from '../../clients/models/client.model';
import { Vehicle } from '../../vehicles/models/vehicle.model';

export interface Guarantee {
  id: number;
  clientId: number;
  client: Client;
  vehicleId: number;
  vehicle: Vehicle;
  createdAt: Date;
  status: GuaranteeStatus;
  paymentOrder: string;
  document: string;
  startDate: Date;
  endDate: Date;
  amount: number;
}

export enum GuaranteeStatus {
  outstanding = 'outstanding',
  paid = 'paid',
  cancelled = 'cancelled',
  expired = 'expired',
}

// {
//   "client": {
//   "personType":"lol",
//   "rfc":"lol",
//   "phone":"lol",
//   "email":"lol",
//   "address":{
//     "zipCode":123,
//     "country":"lol",
//     "state":"lol",
//     "city":"lol",
//     "suburb":"lol",
//     "street":"lol",
//     "streetNumber":"lol"
//   },
//   "salesPlace":"lol"
// },
// "vehicle":{
//   "productType":"lol",
//   "brand":"lol",
//   "model":"lol",
//   "version":"lol",
//   "year": 2009,
//   "invoiceDate":"lol",
//   "vin":"lol",
//   "motorNumber":"lol",
//   "serialNumber":"lol",
//   "horsePower":200,
//   "kilometrageStart":300,
//   "kilometrageEnd":400
// },
//     "createdAt":"lol",
//     "status":"outstanding",
//     "paymentOrder":"lol",
//     "document":"lol",
//     "startDate":"lol",
//     "endDate":"lol",
//     "amount":1
// }
