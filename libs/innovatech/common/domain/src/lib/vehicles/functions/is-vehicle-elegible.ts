import { VehicleStatus } from '../enums';
import { Vehicle } from '../models';

export function isVehicleElegible(vehicle: Vehicle) {
  return (
    vehicle.status === VehicleStatus.elegible ||
    vehicle.status === VehicleStatus.hasActiveGuarantee ||
    vehicle.status === VehicleStatus[VehicleStatus.elegible] ||
    vehicle.status === VehicleStatus[VehicleStatus.hasActiveGuarantee]
  );
}
