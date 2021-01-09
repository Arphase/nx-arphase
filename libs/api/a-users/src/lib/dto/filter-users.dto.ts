import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  companyIds: string;
}
