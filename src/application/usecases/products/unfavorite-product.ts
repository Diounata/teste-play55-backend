import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { UseCase } from '@/application/usecases/use-case';
import { Either, left, right } from '@/core/either';
import { UseCaseError } from '@/core/errors/use-case-error';
import { Injectable } from '@nestjs/common';
import { FavoriteProductNotFoundError } from './_errors/favorite-product-not-found-error';

export interface Input {
  accountId: string;
  productId: number;
}

export type Output = Either<
  UseCaseError,
  { accountId: string; productId: number }
>;

@Injectable()
export class UnfavoriteProductUseCase implements UseCase {
  constructor(
    private accountFavoriteProductsRepository: AccountFavoriteProductsRepository,
  ) {}

  async handle(input: Input): Promise<Output> {
    const { accountId, productId } = input;

    const favoriteProduct =
      await this.accountFavoriteProductsRepository.findAccountFavoriteProduct(
        accountId,
        productId,
      );
    if (!favoriteProduct) return left(new FavoriteProductNotFoundError());

    await this.accountFavoriteProductsRepository.unfavoriteProduct(
      favoriteProduct,
    );

    return right({
      accountId,
      productId,
    });
  }
}
