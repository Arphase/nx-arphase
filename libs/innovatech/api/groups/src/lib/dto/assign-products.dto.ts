import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignProductsDto {
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  productIds: number[];
}
