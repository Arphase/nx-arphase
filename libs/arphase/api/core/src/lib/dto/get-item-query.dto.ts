import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class ApsGetItemQueryDto {
  @IsOptional()
  @Transform((_, obj) =>
    String(obj['relations'])
      .split(',')
      .map(relation => relation)
      .filter(relation => !!relation)
  )
  @IsArray()
  relations?: string[];
}
