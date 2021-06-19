import { ApsCollectionFilterDto } from '@arphase/api';
import { convertStringToNumberArray } from '@innovatech/common/utils';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CommonFilterDto extends ApsCollectionFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ obj, key }) => Number([obj[key]]))
  groupId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  groupIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  companyIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ obj, key }) => convertStringToNumberArray(obj[key]))
  userIds: number[];
}
