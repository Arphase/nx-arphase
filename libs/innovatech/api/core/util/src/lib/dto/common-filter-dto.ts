import { ApsCollectionFilterDto } from '@arphase/api/core';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class CommonFilterDto extends ApsCollectionFilterDto {
  @IsOptional()
  groupId: number;

  @IsOptional()
  @Transform(({ obj }) =>
    String(obj['groupIds'])
      .split(',')
      .map(id => Number(id))
  )
  @IsArray()
  groupIds: number[];

  @IsOptional()
  @Transform(({ obj }) =>
    String(obj['companyIds'])
      .split(',')
      .map(id => Number(id))
  )
  @IsArray()
  companyIds: number[];

  @IsOptional()
  @Transform(({ obj }) =>
    String(obj['userIds'])
      .split(',')
      .map(id => Number(id))
  )
  @IsArray()
  userIds: number[];
}
