import { VehicleStatus } from '@innovatech/common/domain';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @Transform((_, obj) => VehicleStatus[obj['status']])
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
