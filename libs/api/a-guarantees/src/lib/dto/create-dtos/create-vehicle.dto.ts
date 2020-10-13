import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

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
  vin: string;

  @IsNotEmpty()
  @IsString()
  motorNumber: string;

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
