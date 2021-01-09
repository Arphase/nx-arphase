import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterCompaniesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  groupIds: string;
}
