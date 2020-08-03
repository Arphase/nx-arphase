import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetGuaranteesFilterDto {
  @IsOptional()
  startDate: Date;

  @IsOptional()
  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  @IsNotEmpty()
  vin: string;

  @IsOptional()
  @IsNotEmpty()
  amount: number;
}
