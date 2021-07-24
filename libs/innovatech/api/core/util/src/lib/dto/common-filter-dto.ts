import { ApsCollectionFilterDto } from '@arphase/api/core';
import { convertStringToNumberArray } from '@innovatech/common/utils';
import { Transform } from 'class-transformer';
import { IsArray, IsNumberString, IsOptional } from 'class-validator';

export class CommonFilterDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsNumberString()
  groupId: number;

  @IsOptional()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  groupIds: number[];

  @IsOptional()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  companyIds: number[];

  @IsOptional()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  userIds: number[];
}
