import { RegisterAccountUseCase } from '@/application/usecases/accounts/register-account';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterAccountRequestBody } from './dtos/register-account-dto';

@Controller('accounts')
export class RegisterAccountController {
  constructor(private registerAccountUseCase: RegisterAccountUseCase) {}

  @Post('register')
  @HttpCode(201)
  async handle(@Body(ValidationPipe) body: RegisterAccountRequestBody) {
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

    return {
      accessToken: result.value.accessToken,
    };
  }
}
