import { RegisterAccountUseCase } from '@/application/usecases/accounts/register-account';
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
import { RegisterAccountRequestBody } from './dtos/register-account-dto';

@ApiTags('accounts')
@Controller('accounts')
export class RegisterAccountController {
  constructor(private registerAccountUseCase: RegisterAccountUseCase) {}

  @ApiOperation({
    summary: 'Registra uma nova conta no sistema',
    description: 'Permite criar uma nova conta com nome, e-mail e senha',
  })
  @ApiResponse({
    status: 201,
    description: 'Conta criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou credenciais inválidas',
  })
  @Post('register')
  @HttpCode(201)
  async handle(
    @Body(ValidationPipe) body: RegisterAccountRequestBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.registerAccountUseCase.handle({
      name: body.name,
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
