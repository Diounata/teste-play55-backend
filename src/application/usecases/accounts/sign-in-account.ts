import { Encrypter } from '@/application/cryptography/encrypter';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { InvalidCredentialsError } from '@/application/usecases/_errors/invalid-credentials';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';

export interface Input {
  email: string;
  rawPassword: string;
}

export type Output = Either<UseCaseError, { accessToken: string }>;

export class SignInAccountUseCase implements UseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private encrypter: Encrypter,
  ) { }

  async handle(input: Input): Promise<Output> {
    const account = await this.accountsRepository.findAccountByEmail(
      input.email,
    );
    if (!account) return left(new InvalidCredentialsError());

    const isValidCredentials = account
      .getPassword()
      .verifyRawPassword(input.rawPassword);
    if (!isValidCredentials) return left(new InvalidCredentialsError());

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
      name: account.getName(),
    });

    return right({
      accessToken,
    });
  }
}
