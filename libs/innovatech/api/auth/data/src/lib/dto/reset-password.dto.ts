import { IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña no cumple con las condiciones necesarias',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordToken: string;
}
