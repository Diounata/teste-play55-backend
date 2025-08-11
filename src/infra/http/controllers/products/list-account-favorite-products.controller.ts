import { ListAccountFavoriteProductsQuery } from '@/application/queries/products/list-account-favorite-products';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListAccountFavoriteProductsRequestQueryParams } from './dtos/list-account-favorite-products-dto';

@ApiTags('products')
@Controller('products')
export class ListAccountFavoriteProductsController {
  constructor(
    private listAccountFavoriteProductsQuery: ListAccountFavoriteProductsQuery,
  ) {}

  @ApiOperation({
    summary: 'Busca os produtos favoritados pela conta autenticada',
    description:
      'Permite buscar os dados dos produtos favoritos da conta autenticada',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados dos produtos favoritos retornados com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @UseGuards(AuthGuard)
  @Get('/favorites')
  @HttpCode(200)
  async handle(
    @Req() req,
    @Query(ValidationPipe)
    params: ListAccountFavoriteProductsRequestQueryParams,
  ) {
    const result = await this.listAccountFavoriteProductsQuery.handle({
      accountId: req.user.sub,
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
