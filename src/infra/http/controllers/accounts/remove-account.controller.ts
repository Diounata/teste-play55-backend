import { RemoveAccountUseCase } from '@/application/usecases/accounts/remove-account';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveAccountRequestBody } from './dtos/remove-account-dto';

@ApiTags('accounts')
@ApiCookieAuth()
@Controller('accounts')
export class RemoveAccountController {
  constructor(private removeAccountUseCase: RemoveAccountUseCase) {}

  @ApiOperation({
    summary: 'Remove a conta autenticada',
    description: 'Permite remover a conta autenticada',
  })
  @ApiResponse({
    status: 200,
    description: 'Conta removida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou credenciais inválidas',
  })
  @UseGuards(AuthGuard)
  @Delete('')
  @HttpCode(200)
  async handle(
    @Req() req,
    @Body(ValidationPipe) body: RemoveAccountRequestBody,
  ) {
    const result = await this.removeAccountUseCase.handle({
      accountId: req.user.sub,
      currentRawPassword: body.rawPassword,
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
    };
  }
}
