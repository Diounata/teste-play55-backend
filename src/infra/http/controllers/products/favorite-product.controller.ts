import { FavoriteProductUseCase } from '@/application/usecases/products/favorite-product';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoriteProductRequestParam } from './dtos/favorite-product-dto';

@ApiTags('products')
@ApiCookieAuth()
@Controller('products')
export class FavoriteProductController {
  constructor(private favoriteProductUseCase: FavoriteProductUseCase) {}

  @ApiOperation({
    summary: 'Favoritar produto',
    description: 'Permite favoritar um produto',
  })
  @ApiResponse({
    status: 201,
    description: 'Produto favoritado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @UseGuards(AuthGuard)
  @Post('/favorites/:productId')
  @HttpCode(201)
  async handle(@Req() req, @Param() params: FavoriteProductRequestParam) {
    const result = await this.favoriteProductUseCase.handle({
      accountId: req.user.sub,
      productId: params.productId,
    });

    if (result.isLeft())
      throw new HttpException(
        {
          code: result.value.code,
          message: result.value.message,
        },
        HttpStatus[result.value.type as keyof typeof HttpStatus],
      );

    return {
      accountId: result.value.accountId,
      productId: result.value.productId,
    };
  }
}
