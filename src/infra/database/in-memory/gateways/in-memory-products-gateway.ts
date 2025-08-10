import { ProductsGateway } from '@/application/gateways/products-gateway';
import { Product } from '@/domain/entities/product';

export class InMemoryProductsGateway implements ProductsGateway {
  products: Product[] = [
    Product.create(
      'Product 1',
      'Description 1',
      'Category 1',
      'http://url.com/img.png',
      100,
    ),
  ];

  async findProductById(productId: string) {
    const product = this.products.find((prod) => prod.getId() === productId);
    return product || null;
  }

  async listProducts() {
    return this.products;
  }
}
