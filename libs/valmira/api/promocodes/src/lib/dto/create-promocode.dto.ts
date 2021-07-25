import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePromocodeDto {
  @IsString()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  amount: number;
}
