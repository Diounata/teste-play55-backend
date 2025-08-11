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
import { EditAccountRequestBody } from './dtos/edit-account-dto';

@Controller('accounts')
export class EditAccountController {
  constructor(private editAccountUseCase: EditAccountUseCase) {}

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
