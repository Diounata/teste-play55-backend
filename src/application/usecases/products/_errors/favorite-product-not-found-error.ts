import { UseCaseError, UseCaseErrorType } from '@/core/errors/use-case-error';

export class FavoriteProductNotFoundError
  extends Error
  implements UseCaseError
{
  code: string;
  type: UseCaseErrorType;

  constructor() {
    super('Favorite product not found');
    this.code = 'favorite-product-not-found';
    this.type = UseCaseErrorType.NOT_FOUND;
  }
}
