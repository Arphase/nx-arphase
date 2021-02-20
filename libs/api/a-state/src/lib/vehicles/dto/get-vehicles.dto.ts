import { VehicleStatus } from '@ivt/c-data';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetVehiclesDto extends CommonFilterDto {
  @IsOptional()
  @Transform(({ obj, key }) => VehicleStatus[obj[key]])
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
