import { ApsCollectionFilterDto } from '@arphase/api/core';
import { IsArray, IsOptional } from 'class-validator';

export class CommonFilterDto extends ApsCollectionFilterDto {
  @IsOptional()
  groupId: number;

  @IsOptional()
  @IsArray()
  groupIds: number[];

  @IsOptional()
  @IsArray()
  companyIds: number[];

  @IsOptional()
  @IsArray()
  userIds: number[];
}
