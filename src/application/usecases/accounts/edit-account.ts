import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';
import { Account } from '@/domain/entities/account';

export interface Input {
  accountId: string;
  name: string;
}

export type Output = Either<UseCaseError, { accountId: string; name: string }>;

export class EditAccountUseCase implements UseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async handle(input: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountById(
      input.accountId,
    );
    if (!account) {
      return left(new AccountNotFoundError());
    }

    const updatedAccount = new Account(
      account.getId(),
      input.name,
      account.getEmail(),
      account.getPassword().getValue(),
      account.getCreatedAt(),
      new Date(),
    );

    const result = await this.accountsRepository.editAccount(updatedAccount);

    if (!result) return left(new AccountNotFoundError());

    return right({
      accountId: result.getId(),
      name: result.getName(),
    });
  }
}
