import { isVehicleElegible, User, UserRoles, Vehicle } from '@innovatech/common/domain';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';

export function validateVehicle(vehicle: Vehicle, user: Partial<User>): void {
  if (user && user.role !== UserRoles.superAdmin) {
    if (vehicle?.companyId !== user.companyId) {
      throw new ForbiddenException('No se puede actualizar una garantía con un vehículo de otra compañía');
    }
  }

  if (!vehicle) {
    throw new NotFoundException(`Vehicle with id ${vehicle.id} doesn't exist`);
  }

  if (!isVehicleElegible(vehicle)) {
    throw new ConflictException(`Vehicle with id ${vehicle.id} isn't elegible for a guarantee`);
  }
}
