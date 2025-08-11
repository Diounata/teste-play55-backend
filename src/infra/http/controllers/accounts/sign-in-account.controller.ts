import { SignInAccountUseCase } from '@/application/usecases/accounts/sign-in-account';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SignInAccountRequestBody } from './dtos/sign-in-account-dto';

@Controller('accounts')
export class SignInAccountController {
  constructor(private signInAccountUseCase: SignInAccountUseCase) {}

  @Post('sign-in')
  @HttpCode(200)
  async handle(@Body(ValidationPipe) body: SignInAccountRequestBody) {
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

    return {
      accessToken: result.value.accessToken,
    };
  }
}
