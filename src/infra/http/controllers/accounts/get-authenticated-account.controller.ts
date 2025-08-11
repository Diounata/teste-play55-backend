import { GetAuthenticatedAccountQuery } from '@/application/queries/accounts/get-authenticated-account';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('accounts')
@ApiCookieAuth()
@Controller('accounts')
export class GetAuthenticatedAccountController {
  constructor(
    private getAuthenticatedAccountQuery: GetAuthenticatedAccountQuery,
  ) {}

  @ApiOperation({
    summary: 'Busca os dados da conta',
    description: 'Permite buscar os dados da conta autenticada',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados da conta retornados com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou não autorizado',
  })
  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(200)
  async handle(@Req() req) {
    const result = await this.getAuthenticatedAccountQuery.handle({
      accountId: req.user.sub,
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
      account: result.value.account,
    };
  }
}
