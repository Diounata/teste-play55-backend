import { ProductsGateway } from '@/application/gateways/products-gateway';
import { ProductNotFoundError } from '@/application/usecases/products/_errors/product-not-found-error';
import { Either, left, right } from '@/core/either';
import { QueryError } from '@/core/errors/query-error';
import { Injectable } from '@nestjs/common';

type Input = {
  productId: number;
};

type Output = Either<
  QueryError,
  {
    product: {
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
    };
  }
>;

@Injectable()
export class GetProductQuery {
  constructor(private productsGateway: ProductsGateway) {}

  async handle({ productId }: Input): Promise<Output> {
    const product = await this.productsGateway.findProductById(productId);
    if (!product) return left(new ProductNotFoundError());

    return right({
      product: {
        id: product.getId(),
        title: product.getTitle(),
        price: product.getPrice(),
        description: product.getDescription(),
        category: product.getCategory(),
        image: product.getImage(),
        rating: product.getRating(),
      },
    });
  }
}
