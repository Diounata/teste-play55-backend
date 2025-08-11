import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials-error';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';
import { Account } from '@/domain/entities/account';
import { Password } from '@/domain/value-objects/password';
import { Injectable } from '@nestjs/common';

export interface Input {
  accountId: string;
  currentRawPassword: string;
  email?: string;
  newRawPassword?: string;
}

export type Output = Either<
  UseCaseError,
  {
    accountId: string;
    name: string;
    email: string;
  }
>;

@Injectable()
export class EditAccountCredentialsUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle(input: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountById(
      input.accountId,
    );
    if (!account) {
      return left(new AccountNotFoundError());
    }

    const isCorrectCredentials = account
      .getPassword()
      .verifyRawPassword(input.currentRawPassword);
    if (!isCorrectCredentials) {
      return left(new InvalidCredentialsError());
    }

    const email = input.email ?? account.getEmail();
    const passwordHash = input.newRawPassword
      ? Password.create(input.newRawPassword).getValue()
      : account.getPassword().getValue();

    const updatedAccount = new Account(
      account.getId(),
      account.getName(),
      email,
      passwordHash,
      account.getCreatedAt(),
      new Date(),
    );

    await this.accountsRepository.editAccount(updatedAccount);

    return right({
      accountId: updatedAccount.getId(),
      name: updatedAccount.getName(),
      email: updatedAccount.getEmail(),
    });
  }
}
