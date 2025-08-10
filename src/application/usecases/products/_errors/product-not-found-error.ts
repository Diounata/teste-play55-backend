import { UseCaseError, UseCaseErrorType } from '@/core/errors/use-case-error';

export class ProductNotFoundError extends Error implements UseCaseError {
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super('Product not found');
    this.code = 'product-not-found';
    this.type = UseCaseErrorType.NOT_FOUND;
  }
}
