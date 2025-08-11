import {
  ITEMS_PER_PAGE,
  PaginationInput,
  PaginationOutput,
} from '@/application/database/pagination-data';
import { ProductsGateway } from '@/application/gateways/products-gateway';
import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { FavoriteProductNotFoundError } from '@/application/usecases/products/_errors/favorite-product-not-found-error';
import { Either, right } from '@/core/either';
import { QueryError } from '@/core/errors/query-error';
import { Injectable } from '@nestjs/common';

type Input = PaginationInput & { accountId: string };

type Output = Either<
  QueryError,
  PaginationOutput<{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    favoritedAt: string;
  }>
>;

@Injectable()
export class ListAccountFavoriteProductsQuery {
  constructor(
    private productsGateway: ProductsGateway,
    private accountFavoriteProductsRepository: AccountFavoriteProductsRepository,
  ) {}

  async handle({
    page = 1,
    itemsPerPage = ITEMS_PER_PAGE,
    accountId,
  }: Input): Promise<Output> {
    const accountFavoriteProducts =
      await this.accountFavoriteProductsRepository.listAccountFavoriteProducts(
        accountId,
      );

    const allItems = await Promise.all(
      accountFavoriteProducts.map(async (favorite) => {
        const product = await this.productsGateway.findProductById(
          favorite.getProductId(),
        );
        if (!product) throw new FavoriteProductNotFoundError();

        return {
          id: product.getId(),
          title: product.getTitle(),
          price: product.getPrice(),
          description: product.getDescription(),
          category: product.getCategory(),
          image: product.getImage(),
          rating: product.getRating(),
          favoritedAt: favorite.getCreatedAt().toISOString(),
        };
      }),
    );

    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedItems = allItems.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    return right({
      items: paginatedItems,
      page,
      itemsPerPage,
      totalItems,
      totalPages: totalPages,
    });
  }
}
