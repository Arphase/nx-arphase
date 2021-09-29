import { IsString } from 'class-validator';

export class GetPromocodeByNameDto {
  @IsString()
  name: string;
}
