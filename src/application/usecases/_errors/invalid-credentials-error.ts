import { UseCaseError, UseCaseErrorType } from 'src/core/errors/use-case-error';

export class InvalidCredentialsError extends Error implements UseCaseError {
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super(`Invalid credentials.`);
    this.code = 'invalid-credentials';
    this.type = UseCaseErrorType.UNAUTHORIZED;
  }
}
