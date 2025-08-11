import { EditAccountCredentialsUseCase } from '@/application/usecases/accounts/edit-account-credentials';
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
import { EditAccountCredentialsRequestBody } from './dtos/edit-account-credentials-dto';

@Controller('accounts')
export class EditAccountCredentialsController {
  constructor(
    private editAccountCredentialsUseCase: EditAccountCredentialsUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Put('credentials')
  @HttpCode(200)
  async handle(
    @Req() req,
    @Body(ValidationPipe) body: EditAccountCredentialsRequestBody,
  ) {
    const result = await this.editAccountCredentialsUseCase.handle({
      accountId: req.user.sub,
      currentRawPassword: body.currentRawPassword,
      email: body.email,
      newRawPassword: body.newRawPassword,
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
      email: result.value.email,
    };
  }
}
