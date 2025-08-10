import { UseCaseError, UseCaseErrorType } from '@/core/errors/use-case-error';

export class AccountNotFoundError extends Error implements UseCaseError {
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super('Account not found');
    this.code = 'account-not-found';
    this.type = UseCaseErrorType.NOT_FOUND;
  }
}
