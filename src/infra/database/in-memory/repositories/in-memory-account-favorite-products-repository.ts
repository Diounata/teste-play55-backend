import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';

export class InMemoryAccountFavoriteProductsRepository
  implements AccountFavoriteProductsRepository
{
  accountFavoriteProducts: AccountFavoriteProduct[] = [];

  findAccountFavoriteProduct(accountId: string, productId: string) {
    const favorite = this.accountFavoriteProducts.find(
      (fav) =>
        fav.getAccountId() === accountId && fav.getProductId() === productId,
    );
    return Promise.resolve(favorite ?? null);
  }

  favoriteProduct(accountFavoriteProduct: AccountFavoriteProduct) {
    this.accountFavoriteProducts.push(accountFavoriteProduct);
    return Promise.resolve();
  }

  unfavoriteProduct(accountFavoriteProduct: AccountFavoriteProduct) {
    this.accountFavoriteProducts = this.accountFavoriteProducts.filter(
      (fav) =>
        fav.getAccountId() !== accountFavoriteProduct.getAccountId() ||
        fav.getProductId() !== accountFavoriteProduct.getProductId(),
    );
    return Promise.resolve();
  }
}
