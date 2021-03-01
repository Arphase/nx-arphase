import { IvtHttpErrorResponse, Vehicle } from '@ivt/c-data';

export interface VehiclesState {
  vehicle: Vehicle;
  error: IvtHttpErrorResponse;
}
