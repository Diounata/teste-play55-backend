import { ProductsGateway } from '@/application/gateways/products-gateway';
import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { DuplicateAccountFavoritedProductError } from '@/application/usecases/products/_errors/duplicate-account-favorite-product-error';
import { ProductNotFoundError } from '@/application/usecases/products/_errors/product-not-found-error';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';
import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';
import { Injectable } from '@nestjs/common';

export interface Input {
  accountId: string;
  productId: number;
}

export type Output = Either<
  UseCaseError,
  { accountId: string; productId: number; accountFavoriteProductId: string }
>;

@Injectable()
export class FavoriteProductUseCase implements UseCase {
  constructor(
    private accountFavoriteProductsRepository: AccountFavoriteProductsRepository,
    private accountsRepository: AccountsRepository,
    private productsGateway: ProductsGateway,
  ) {}

  async handle(input: Input): Promise<Output> {
    const { accountId, productId } = input;

    const product = await this.productsGateway.findProductById(productId);
    if (!product) {
      return left(new ProductNotFoundError());
    }

    const account = await this.accountsRepository.findAccountById(accountId);
    if (!account) {
      return left(new AccountNotFoundError());
    }

    const hasFavoriteProduct =
      !!(await this.accountFavoriteProductsRepository.findAccountFavoriteProduct(
        accountId,
        productId,
      ));
    if (hasFavoriteProduct) {
      return left(new DuplicateAccountFavoritedProductError());
    }

    const accountFavoriteProduct = AccountFavoriteProduct.create(
      accountId,
      productId,
    );
    await this.accountFavoriteProductsRepository.favoriteProduct(
      accountFavoriteProduct,
    );

    return right({
      accountId,
      productId,
      accountFavoriteProductId: accountFavoriteProduct.getId(),
    });
  }
}
