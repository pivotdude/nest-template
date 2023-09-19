import { IsEmail, IsString, MinLength, Validate } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @Validate((value, { object }) => {
    if (value !== object.password) {
      throw new Error('Пароли не совпадают');
    }
  })
  repeatPassword: string;
}
