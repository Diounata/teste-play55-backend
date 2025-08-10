import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials-error';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { RemoveAccountUseCase } from '@/application/usecases/accounts/remove-account';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/repositories/in-memory-accounts-repository';
import { beforeEach, describe, expect, it } from 'vitest';

let accountsRepository: AccountsRepository;
let sut: RemoveAccountUseCase;

describe('[UC] Remove account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    sut = new RemoveAccountUseCase(accountsRepository);
  });

  it('should remove an account', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: 'password123',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accountId: account.getId(),
    });

    const deletedAccount = await accountsRepository.findAccountById(
      account.getId(),
    );
    expect(deletedAccount).toBeNull();
  });

  it('should not remove an account with wrong password', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: 'wrong-password',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not remove a non-existent account', async () => {
    const result = await sut.handle({
      accountId: 'non-existent-id',
      currentRawPassword: 'password123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });
});
