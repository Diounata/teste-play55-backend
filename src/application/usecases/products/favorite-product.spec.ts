import { ProductsGateway } from '@/application/gateways/products-gateway';
import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Account } from '@/domain/entities/account';
import { InMemoryProductsGateway } from '@/infra/database/in-memory/gateways/in-memory-products-gateway';
import { InMemoryAccountFavoriteProductsRepository } from '@/infra/database/in-memory/repositories/in-memory-account-favorite-products-repository';
import { InMemoryAccountsRepository } from '@/infra/database/in-memory/repositories/in-memory-accounts-repository';
import { describe } from 'vitest';
import { AccountNotFoundError } from '../accounts/_errors/account-not-found-error';
import { ProductNotFoundError } from './_errors/product-not-found-error';
import { FavoriteProductUseCase } from './favorite-product';

let accountFavoriteProductsRepository: AccountFavoriteProductsRepository;
let accountsRepository: AccountsRepository;
let productsGateway: ProductsGateway;
let sut: FavoriteProductUseCase;

describe('[UC] Favorite product to an account', () => {
  beforeEach(() => {
    accountFavoriteProductsRepository =
      new InMemoryAccountFavoriteProductsRepository();
    accountsRepository = new InMemoryAccountsRepository();
    productsGateway = new InMemoryProductsGateway();
    sut = new FavoriteProductUseCase(
      accountFavoriteProductsRepository,
      accountsRepository,
      productsGateway,
    );
  });

  it('should favorite a product linked to an account', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );
    await accountsRepository.registerAccount(account);

    const product = (await productsGateway.listProducts()).at(0);
    if (!product) throw new Error('No product found');

    const result = await sut.handle({
      accountId: account.getId(),
      productId: product.getId(),
    });

    expect(result.isRight()).toBe(true);
  });

  it('should throws when trying to favorite a nonexistent product', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );

    await accountsRepository.registerAccount(account);

    const result = await sut.handle({
      accountId: account.getId(),
      productId: 'nonexistent-product-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ProductNotFoundError);
  });

  it('should throws when trying to favorite a product with an account that does not exist', async () => {
    const product = (await productsGateway.listProducts()).at(0);
    if (!product) throw new Error('No product found');

    const result = await sut.handle({
      accountId: 'nonexistent-account-id',
      productId: product.getId(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AccountNotFoundError);
  });

  it('should throw an error when trying to favorite a product that is already favorited', async () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      'password123',
    );
    await accountsRepository.registerAccount(account);

    const product = (await productsGateway.listProducts()).at(0);
    if (!product) throw new Error('No product found');

    await sut.handle({
      accountId: account.getId(),
      productId: product.getId(),
    });

    const result = await sut.handle({
      accountId: account.getId(),
      productId: product.getId(),
    });

    expect(result.isLeft()).toBe(true);
  });
});
