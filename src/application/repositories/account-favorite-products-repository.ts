import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';

export abstract class AccountFavoriteProductsRepository {
  abstract favoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void>;
  abstract unfavoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void>;
  abstract findAccountFavoriteProduct(
    accountId: string,
    productId: number,
  ): Promise<AccountFavoriteProduct | null>;
  abstract listAccountFavoriteProducts(
    accountId: string,
  ): Promise<AccountFavoriteProduct[]>;
}
