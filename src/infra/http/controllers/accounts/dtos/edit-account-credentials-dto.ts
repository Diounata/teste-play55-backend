import { IsOptional, IsString, MinLength } from 'class-validator';

export class EditAccountCredentialsRequestBody {
  @IsString()
  @MinLength(6)
  currentRawPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  newRawPassword?: string;
}
