import { Encrypter } from '@/application/cryptography/encrypter';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { DuplicateEmailError } from '@/application/usecases/_errors/duplicate-email-error';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';
import { Account } from '@/domain/entities/account';
import { Injectable } from '@nestjs/common';

export interface Input {
  name: string;
  email: string;
  rawPassword: string;
}

export type Output = Either<UseCaseError, { accessToken: string }>;

@Injectable()
export class RegisterAccountUseCase implements UseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private encrypter: Encrypter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const existingAccount = await this.accountsRepository.findAccountByEmail(
      input.email,
    );
    if (existingAccount) {
      return left(new DuplicateEmailError(input.email));
    }

    const account = Account.create(input.name, input.email, input.rawPassword);
    await this.accountsRepository.registerAccount(account);

    const accessToken = await this.encrypter.encrypt({
      sub: account.getId(),
      name: account.getName(),
    });

    return right({
      accessToken,
    });
  }
}
