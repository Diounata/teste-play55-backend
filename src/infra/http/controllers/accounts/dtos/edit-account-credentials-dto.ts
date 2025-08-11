import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class EditAccountCredentialsRequestBody {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  currentRawPassword: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  newRawPassword?: string;
}
