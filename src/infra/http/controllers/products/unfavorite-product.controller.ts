import { UnfavoriteProductUseCase } from '@/application/usecases/products/unfavorite-product';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnfavoriteProductRequestParam } from './dtos/unfavorite-product-dto';

@ApiTags('products')
@ApiCookieAuth()
@Controller('products')
export class UnfavoriteProductController {
  constructor(private unfavoriteProductUseCase: UnfavoriteProductUseCase) {}

  @ApiOperation({
    summary: 'Desfavoritar produto',
    description: 'Permite desfavoritar um produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto desfavoritado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @UseGuards(AuthGuard)
  @Delete('/favorites/:productId')
  @HttpCode(200)
  async handle(@Req() req, @Param() params: UnfavoriteProductRequestParam) {
    const result = await this.unfavoriteProductUseCase.handle({
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
