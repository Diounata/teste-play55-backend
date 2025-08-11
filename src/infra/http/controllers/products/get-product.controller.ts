import { GetProductQuery } from '@/application/queries/products/get-product';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductRequestParam } from './dtos/get-product-dto';

@ApiTags('products')
@Controller('products')
@UseInterceptors(CacheInterceptor)
export class GetProductController {
  constructor(private getProductQuery: GetProductQuery) {}

  @ApiOperation({
    summary: 'Buscar produto',
    description: 'Permite buscar por um produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @Get(':productId')
  @HttpCode(200)
  async handle(@Param() params: GetProductRequestParam) {
    const result = await this.getProductQuery.handle({
      productId: params.productId,
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
      product: {
        id: result.value.product.id,
        title: result.value.product.title,
        price: result.value.product.price,
        description: result.value.product.description,
        category: result.value.product.category,
        image: result.value.product.image,
        rating: {
          rate: result.value.product.rating.rate,
          count: result.value.product.rating.count,
        },
      },
    };
  }
}
