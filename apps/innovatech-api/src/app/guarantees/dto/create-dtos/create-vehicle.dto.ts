import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  @IsNumber()
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
  @IsNumber()
  horsePower: number;

  @IsNotEmpty()
  @IsNumber()
  kilometrageStart: number;

  @IsNotEmpty()
  @IsNumber()
  kilometrageEnd: number;
}
