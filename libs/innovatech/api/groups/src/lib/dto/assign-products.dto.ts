import { IsNumber } from 'class-validator';

export class AssignProductsDto {
  @IsNumber()
  groupId: number;

  @IsNumber({}, { each: true })
  productIds: number[];
}
