import {
  ITEMS_PER_PAGE,
  PaginationInput,
  PaginationOutput,
} from '@/application/database/pagination-data';
import { ProductsGateway } from '@/application/gateways/products-gateway';
import { ProductNotFoundError } from '@/application/usecases/products/_errors/product-not-found-error';
import { Either, left, right } from '@/core/either';
import { QueryError } from '@/core/errors/query-error';

type Input = PaginationInput;

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
  }>
>;

export class ListProductsQuery {
  constructor(private productsGateway: ProductsGateway) {}

  async handle({
    page = 1,
    itemsPerPage = ITEMS_PER_PAGE,
  }: Input): Promise<Output> {
    const products = await this.productsGateway.listProducts();
    if (!products) return left(new ProductNotFoundError());

    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedItems = products.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
    const items = paginatedItems.map((product) => ({
      id: product.getId(),
      title: product.getTitle(),
      price: product.getPrice(),
      description: product.getDescription(),
      category: product.getCategory(),
      image: product.getImage(),
      rating: product.getRating(),
    }));

    return right({
      items,
      page,
      itemsPerPage,
      totalItems,
      totalPages: totalPages,
    });
  }
}
