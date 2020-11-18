import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetGroupsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  offset;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  limit;

  @IsOptional()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
