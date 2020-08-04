import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumberString()
  horsePower: number;

  @IsNotEmpty()
  @IsNumberString()
  kilometrageStart: number;

  @IsNotEmpty()
  @IsNumberString()
  kilometrageEnd: number;
}
