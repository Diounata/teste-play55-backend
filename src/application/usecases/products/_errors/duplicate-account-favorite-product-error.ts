import { UseCaseError, UseCaseErrorType } from '@/core/errors/use-case-error';

export class DuplicateAccountFavoritedProductError
  extends Error
  implements UseCaseError
{
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super('This product has already been favorited by this account.');
    this.code = 'duplicate-account-favorite-product';
    this.type = UseCaseErrorType.CONFLICT;
  }
}
