import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { EditAccountUseCase } from '@/application/usecases/accounts/edit-account';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/repositories/in-memory-accounts-repository';
import { describe } from 'vitest';

let accountsRepository: AccountsRepository;
let sut: EditAccountUseCase;

describe('[UC] Edit account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    sut = new EditAccountUseCase(accountsRepository);
  });

  it('should edit an account', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );
    await accountsRepository.registerAccount(account);

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
});
