import { IsString, MinLength } from 'class-validator';

export class RemoveAccountRequestBody {
  @IsString()
  @MinLength(6)
  rawPassword: string;
}
