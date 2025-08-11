import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class ListAccountFavoriteProductsRequestQueryParams {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página (default 1)',
  })
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 1))
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Itens por página (default 10)',
  })
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : 10))
  @IsInt()
  @IsPositive()
  @IsOptional()
  itemsPerPage: number = 10;
}
