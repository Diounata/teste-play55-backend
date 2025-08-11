import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAccountRequestBody {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  rawPassword: string;
}
