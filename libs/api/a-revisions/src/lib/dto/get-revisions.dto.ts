import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class GetRevisionsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  vehicleId;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;
}
