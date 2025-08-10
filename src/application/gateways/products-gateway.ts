import { Product } from '@/domain/entities/product';

export abstract class ProductsGateway {
  abstract listProducts(): Promise<Product[]>;
  abstract findProductById(productId: string): Promise<Product>;
}
