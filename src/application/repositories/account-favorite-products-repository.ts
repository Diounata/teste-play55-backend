import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';

export abstract class AccountFavoriteProductsRepository {
  abstract hasFavoriteProduct(
    accountId: string,
    productId: string,
  ): Promise<boolean>;
  abstract favoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void>;
  abstract unfavoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void>;
}
