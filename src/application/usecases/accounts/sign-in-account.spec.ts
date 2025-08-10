import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials-error';
import { SignInAccountUseCase } from '@/application/usecases/accounts/sign-in-account';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/repositories/in-memory-accounts-repository';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { describe } from 'vitest';

let accountsRepository: AccountsRepository;
let fakeEncrypter: FakeEncrypter;
let sut: SignInAccountUseCase;

describe('[UC] Sign in account', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository();
    fakeEncrypter = new FakeEncrypter();
    sut = new SignInAccountUseCase(accountsRepository, fakeEncrypter);
  });

  it('should sign in an account', async () => {
    await accountsRepository.registerAccount(
      Account.create('John Doe', 'john.doe@example.com', 'password123'),
    );

    const result = await sut.handle({
      email: 'john.doe@example.com',
      rawPassword: 'password123',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({ accessToken: expect.any(String) });
  });

  it('should throws when account does not exists', async () => {
    const result = await sut.handle({
      email: 'not.found@example.com',
      rawPassword: 'password123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should throws when password is invalid', async () => {
    await accountsRepository.registerAccount(
      Account.create('John Doe', 'john.doe@example.com', 'password123'),
    );

    const result = await sut.handle({
      email: 'john.doe@example.com',
      rawPassword: 'wrong-password',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
