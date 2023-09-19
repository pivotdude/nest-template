import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  theme: string;

  @IsString()
  template: string;

  // @IsOptional()
  @IsObject()
  context: any;
}
