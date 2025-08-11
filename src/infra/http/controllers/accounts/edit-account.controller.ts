import { EditAccountUseCase } from '@/application/usecases/accounts/edit-account';
import { AuthGuard } from '@/infra/auth/auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
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
import { EditAccountRequestBody } from './dtos/edit-account-dto';

@ApiTags('accounts')
@ApiCookieAuth()
@Controller('accounts')
export class EditAccountController {
  constructor(private editAccountUseCase: EditAccountUseCase) {}

  @ApiOperation({
    summary: 'Edita os dados básicos da conta',
    description: 'Permite alterar os dados básicos da conta autenticada',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados básicos atualizados com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
  })
  @UseGuards(AuthGuard)
  @Put('/')
  @HttpCode(200)
  async handle(@Req() req, @Body(ValidationPipe) body: EditAccountRequestBody) {
    const result = await this.editAccountUseCase.handle({
      accountId: req.user.sub,
      name: body.name,
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
      name: result.value.name,
    };
  }
}
