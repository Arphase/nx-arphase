import { Client } from "./client.model";
import { Vehicle } from "./vehicle.model";

export interface Guarantee {
  client: Client;
  vehicle: Vehicle;
}
