import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials-error';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';

export interface Input {
  accountId: string;
  currentRawPassword: string;
}

export type Output = Either<UseCaseError, { accountId: string }>;

export class RemoveAccountUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle({ accountId, currentRawPassword }: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountById(accountId);
    if (!account) {
      return left(new AccountNotFoundError());
    }

    const isPasswordValid = account
      .getPassword()
      .verifyRawPassword(currentRawPassword);
    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }

    await this.accountsRepository.removeAccount(account);

    return right({
      accountId: account.getId(),
    });
  }
}
