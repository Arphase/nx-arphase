import { UpdateProductPropertiesDto, UpdateProductPropertyDto } from '@musicr/api/products/util';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateAdditionalOptionsDto implements UpdateProductPropertiesDto {
  @Type(() => UpdateAdditionalOptionDto)
  @ValidateNested({ each: true })
  additionalOptions: UpdateAdditionalOptionDto[];

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}

export class UpdateAdditionalOptionDto implements UpdateProductPropertyDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  _destroy: boolean;
}
