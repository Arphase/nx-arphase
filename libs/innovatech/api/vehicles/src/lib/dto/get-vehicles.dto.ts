import { CommonFilterDto } from '@innovatech/api/core/util';
import { VehicleStatus } from '@innovatech/common/domain';
import { IsEnum, IsOptional } from 'class-validator';

export class GetVehiclesDto extends CommonFilterDto {
  @IsOptional()
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
