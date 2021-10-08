import { VehicleStatus } from '@innovatech/common/domain';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class GetVehiclesDto extends CommonFilterDto {
  @IsOptional()
  @Transform((_, obj) => VehicleStatus[obj['status']])
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
