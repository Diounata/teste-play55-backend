import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInAccountRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  rawPassword: string;
}
