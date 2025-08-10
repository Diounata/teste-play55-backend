import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials-error';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { EditAccountCredentialsUseCase } from '@/application/usecases/accounts/edit-account-credentials';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/repositories/in-memory-accounts-repository';
import { beforeEach, describe, expect, it } from 'vitest';

let accountsRepository: AccountsRepository;
let sut: EditAccountCredentialsUseCase;

const rawPassword = 'password123';

describe('[UC] Edit account credentials', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    sut = new EditAccountCredentialsUseCase(accountsRepository);
  });

  it('should edit an account credentials', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      rawPassword,
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: rawPassword,
      email: 'updated.email@example.com',
      newRawPassword: 'newPassword456',
    });
    const updatedAccount = await accountsRepository.findAccountById(
      account.getId(),
    );

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accountId: expect.any(String),
      name: 'John Doe',
      email: 'updated.email@example.com',
    });
    expect(
      updatedAccount?.getPassword().verifyRawPassword('newPassword456'),
    ).toBe(true);
  });

  it('should edit only an account email', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      rawPassword,
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: rawPassword,
      email: 'updated.email@example.com',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accountId: expect.any(String),
      name: 'John Doe',
      email: 'updated.email@example.com',
    });
  });

  it('should edit only an account password', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      rawPassword,
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: rawPassword,
      newRawPassword: 'newPassword456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accountId: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should throws an error when trying to edit an account that does not exist', async () => {
    const result = await sut.handle({
      accountId: 'non-existing-account-id',
      currentRawPassword: rawPassword,
      email: 'any@email.com',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });

  it('should throws an error for invalid current password', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      rawPassword,
    );
    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      currentRawPassword: 'wrong-password',
      email: 'any@email.com',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
