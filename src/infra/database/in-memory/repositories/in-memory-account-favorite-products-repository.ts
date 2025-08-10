import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';

export class InMemoryAccountFavoriteProductsRepository
  implements AccountFavoriteProductsRepository
{
  accountFavoriteProducts: AccountFavoriteProduct[] = [];

  hasFavoriteProduct(accountId: string, productId: string): Promise<boolean> {
    const hasFavorite = this.accountFavoriteProducts.some(
      (fav) =>
        fav.getAccountId() === accountId && fav.getProductId() === productId,
    );
    return Promise.resolve(hasFavorite);
  }

  favoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void> {
    this.accountFavoriteProducts.push(accountFavoriteProduct);
    return Promise.resolve();
  }

  unfavoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void> {
    this.accountFavoriteProducts = this.accountFavoriteProducts.filter(
      (fav) =>
        fav.getAccountId() !== accountFavoriteProduct.getAccountId() ||
        fav.getProductId() !== accountFavoriteProduct.getProductId(),
    );
    return Promise.resolve();
  }
}
