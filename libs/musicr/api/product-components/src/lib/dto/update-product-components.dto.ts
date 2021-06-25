import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateProductComponentsDto {
  @Type(() => UpdateProductComponentDto)
  @ValidateNested({ each: true })
  productComponents: UpdateProductComponentDto[];
}

export class UpdateProductComponentDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsBoolean()
  _destroy: boolean;
}
