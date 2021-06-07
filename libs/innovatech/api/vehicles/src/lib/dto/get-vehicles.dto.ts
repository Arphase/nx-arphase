import { VehicleStatus } from '@innovatech/common/domain';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class GetVehiclesDto extends CommonFilterDto {
  @IsOptional()
  @Transform(({ obj, key }) => VehicleStatus[obj[key]])
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
