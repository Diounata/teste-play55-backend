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
import { RemoveAccountRequestBody } from './dtos/remove-account-dto';

@Controller('accounts')
export class RemoveAccountController {
  constructor(private removeAccountUseCase: RemoveAccountUseCase) {}

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
