import { ListProductsQuery } from '@/application/queries/products/list-products';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListProductsRequestQueryParams } from './dtos/list-products-dto';

@ApiTags('products')
@Controller('products')
export class ListProductsController {
  constructor(private listProductsQuery: ListProductsQuery) {}

  @ApiOperation({
    summary: 'Busca os dados dos produtos',
    description: 'Permite buscar os dados dos produtos',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados dos produtos retornados com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @Get('')
  @HttpCode(200)
  async handle(@Query(ValidationPipe) params: ListProductsRequestQueryParams) {
    const result = await this.listProductsQuery.handle({
      page: params.page ?? 1,
      itemsPerPage: params.itemsPerPage ?? 10,
    });

    if (result.isLeft())
      throw new HttpException(
        {
          code: result.value.code,
          message: result.value.message,
        },
        400,
      );

    return {
      items: result.value.items,
      page: Number(result.value.page),
      itemsPerPage: Number(result.value.itemsPerPage),
      totalItems: result.value.totalItems,
      totalPages: result.value.totalPages,
    };
  }
}
