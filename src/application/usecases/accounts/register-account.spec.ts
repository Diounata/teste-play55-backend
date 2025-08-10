import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { RegisterAccountUseCase } from '@/application/usecases/accounts/register-account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/in-memory-accounts-repository';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { describe } from 'vitest';
import { DuplicateEmailError } from '../_errors/duplicate-email-error';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: RegisterAccountUseCase;

describe('[UC] Register account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new RegisterAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should register an account', async () => {
    const result = await sut.handle({
      name: 'John Doe',
      email: 'john.doe@example.com',
      rawPassword: 'password123',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({ accessToken: expect.any(String) });
  });

  it('should throws when registering an account with an email being used', async () => {
    await sut.handle({
      name: 'John Doe',
      email: 'john.doe@example.com',
      rawPassword: 'password123',
    });

    const result = await sut.handle({
      name: 'Jane Doe',
      email: 'john.doe@example.com',
      rawPassword: 'password456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DuplicateEmailError);
  });
});
