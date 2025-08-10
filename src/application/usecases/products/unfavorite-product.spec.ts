import { ProductsGateway } from '@/application/gateways/products-gateway';
import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { Account } from '@/domain/entities/account';
import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';
import { InMemoryProductsGateway } from '@/infra/database/in-memory/gateways/in-memory-products-gateway';
import { InMemoryAccountFavoriteProductsRepository } from '@/infra/database/in-memory/repositories/in-memory-account-favorite-products-repository';
import { describe } from 'vitest';
import { FavoriteProductNotFoundError } from './_errors/favorite-product-not-found-error';
import { UnfavoriteProductUseCase } from './unfavorite-product';

let accountFavoriteProductsRepository: AccountFavoriteProductsRepository;
let productsGateway: ProductsGateway;
let sut: UnfavoriteProductUseCase;

describe('[UC] Unfavorite product to an account', () => {
  beforeEach(() => {
    accountFavoriteProductsRepository =
      new InMemoryAccountFavoriteProductsRepository();
    productsGateway = new InMemoryProductsGateway();
    sut = new UnfavoriteProductUseCase(accountFavoriteProductsRepository);
  });

  it('should unfavorite a product linked to an account', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );

    const product = (await productsGateway.listProducts()).at(0);
    if (!product) throw new Error('No product found');

    await accountFavoriteProductsRepository.favoriteProduct(
      AccountFavoriteProduct.create(account.getId(), product.getId()),
    );

    const result = await sut.handle({
      accountId: account.getId(),
      productId: product.getId(),
    });

    expect(result.isRight()).toBe(true);
  });

  it('should throws when trying to unfavorite a nonexistent favorite product', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );

    const product = (await productsGateway.listProducts()).at(0);
    if (!product) throw new Error('No product found');

    const result = await sut.handle({
      accountId: account.getId(),
      productId: product.getId(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(FavoriteProductNotFoundError);
  });
});
