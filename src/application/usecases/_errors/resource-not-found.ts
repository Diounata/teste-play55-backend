import { UseCaseError, UseCaseErrorType } from '@/core/errors/use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super('Resource not found');
    this.code = 'resource-not-found';
    this.type = UseCaseErrorType.NOT_FOUND;
  }
}
