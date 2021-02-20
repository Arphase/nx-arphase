import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { CommonFilterDto } from '../../core';

export class GetRevisionsDto extends CommonFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  vehicleId;
}
