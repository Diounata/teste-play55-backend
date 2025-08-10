import { UseCaseError, UseCaseErrorType } from 'src/core/errors/use-case-error';

export class DuplicateEmailError extends Error implements UseCaseError {
  code: string;
  type: UseCaseErrorType;

  constructor(email: string) {
    super(`Email "${email}" is already being used by an account.`);
    this.code = 'email-being-used';
    this.type = UseCaseErrorType.CONFLICT;
  }
}
