import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FavoriteProductRequestParam {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productId: number;
}
