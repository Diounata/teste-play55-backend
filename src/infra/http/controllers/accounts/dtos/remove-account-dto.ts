import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RemoveAccountRequestBody {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  rawPassword: string;
}
