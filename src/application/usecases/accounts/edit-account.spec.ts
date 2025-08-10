import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { EditAccountUseCase } from '@/application/usecases/accounts/edit-account';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/in-memory-accounts-repository';
import { describe, vi } from 'vitest';

let accountsRepository: AccountsRepository;
let sut: EditAccountUseCase;

describe('[UC] Edit account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    sut = new EditAccountUseCase(accountsRepository);
  });

  it('should edit an account', async () => {
    const account = await accountsRepository.registerAccount(
      Account.create('John Doe', 'john.doe@example.com', 'password123'),
    );

    const result = await sut.handle({
      accountId: account.getId(),
      name: 'Updated name',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accountId: expect.any(String),
      name: 'Updated name',
    });
  });

  it('should throws when trying to edit an account that does not exist', async () => {
    const result = await sut.handle({
      accountId: 'non-existing-account-id',
      name: 'Updated name',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });

  it('should return error if editAccount returns null', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );

    accountsRepository = {
      findAccountById: vi.fn().mockResolvedValue(account),
      editAccount: vi.fn().mockResolvedValue(null),
    } as unknown as AccountsRepository;

    const sut = new EditAccountUseCase(accountsRepository);

    const result = await sut.handle({
      accountId: 'any-id',
      name: 'Updated name',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });
});
