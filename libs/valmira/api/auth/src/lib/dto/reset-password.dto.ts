import { IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña no cumple con las condiciones necesarias',
  })
  password: string;

  @IsString()
  passwordToken: string;
}
