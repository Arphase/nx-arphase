import { IvtHttpErrorResponse, Vehicle } from '@innovatech/common/domain';

export interface VehiclesState {
  vehicle: Vehicle;
  error: IvtHttpErrorResponse;
}
