import { GetAuthenticatedAccountQuery } from '@/application/queries/accounts/get-authenticated-account';
import { EditAccountUseCase } from '@/application/usecases/accounts/edit-account';
import { EditAccountCredentialsUseCase } from '@/application/usecases/accounts/edit-account-credentials';
import { RegisterAccountUseCase } from '@/application/usecases/accounts/register-account';
import { RemoveAccountUseCase } from '@/application/usecases/accounts/remove-account';
import { SignInAccountUseCase } from '@/application/usecases/accounts/sign-in-account';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { RegisterAccountController } from '@/infra/http/controllers/accounts/register-account.controller';
import { Module } from '@nestjs/common';
import { EditAccountCredentialsController } from '../controllers/accounts/edit-account-credentials.controller';
import { EditAccountController } from '../controllers/accounts/edit-account.controller';
import { GetAuthenticatedAccountController } from '../controllers/accounts/get-authenticated-account.controller';
import { RemoveAccountController } from '../controllers/accounts/remove-account.controller';
import { SignInAccountController } from '../controllers/accounts/sign-in-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    RegisterAccountController,
    SignInAccountController,
    GetAuthenticatedAccountController,
    EditAccountController,
    EditAccountCredentialsController,
    RemoveAccountController,
  ],
  providers: [
    RegisterAccountUseCase,
    SignInAccountUseCase,
    GetAuthenticatedAccountQuery,
    EditAccountUseCase,
    EditAccountCredentialsUseCase,
    RemoveAccountUseCase,
  ],
})
export class AccountsModule {}
