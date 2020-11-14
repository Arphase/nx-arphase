import { IsNotEmpty ,IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsNumber()
    price: number;
  
    @IsOptional()
    @IsString()
    template: string;
  
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    logo: string;

}