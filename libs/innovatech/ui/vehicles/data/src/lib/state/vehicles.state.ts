import { ApsHttpErrorResponse } from '@arphase/common';
import { Vehicle } from '@innovatech/common/domain';

export interface VehiclesState {
  vehicle: Vehicle;
  error: ApsHttpErrorResponse;
}
