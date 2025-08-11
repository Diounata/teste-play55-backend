import { SignInAccountUseCase } from '@/application/usecases/accounts/sign-in-account';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInAccountRequestBody } from './dtos/sign-in-account-dto';

@ApiTags('accounts')
@Controller('accounts')
export class SignInAccountController {
  constructor(private signInAccountUseCase: SignInAccountUseCase) {}

  @ApiOperation({
    summary: 'Entrar na conta',
    description: 'Permite entrar em uma conta registrada no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Conta autenticada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou credenciais inválidas',
  })
  @Post('sign-in')
  @HttpCode(200)
  async handle(
    @Body(ValidationPipe) body: SignInAccountRequestBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.signInAccountUseCase.handle({
      email: body.email,
      rawPassword: body.rawPassword,
    });

    if (result.isLeft())
      throw new HttpException(
        {
          code: result.value.code,
          message: result.value.message,
        },
        HttpStatus[result.value.type as keyof typeof HttpStatus],
      );

    response
      .status(200)
      .cookie('auth-jwt-token', result.value.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      })
      .send({
        accessToken: result.value.accessToken,
      });
  }
}
