import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';

export abstract class AccountFavoriteProductsRepository {
  abstract favoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<AccountFavoriteProduct>;
  abstract unfavoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<AccountFavoriteProduct>;
}
