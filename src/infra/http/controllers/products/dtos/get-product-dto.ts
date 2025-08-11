import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetProductRequestParam {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productId: number;
}
