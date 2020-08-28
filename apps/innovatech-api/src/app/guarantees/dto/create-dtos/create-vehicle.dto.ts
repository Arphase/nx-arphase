import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  productType: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @Type(() => String)
  @IsNotEmpty()
  @IsNumberString()
  year: number;

  @IsNotEmpty()
  @IsString()
  invoiceDate: string;

  @IsNotEmpty()
  @IsString()
  vin: string;

  @IsNotEmpty()
  @IsString()
  motorNumber: string;

  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @Type(() => String)
  @IsNotEmpty()
  @IsNumberString()
  horsePower: number;

  @Type(() => String)
  @IsNotEmpty()
  @IsNumberString()
  kilometrageStart: number;

  @Type(() => String)
  @IsNotEmpty()
  @IsNumberString()
  kilometrageEnd: number;
}
