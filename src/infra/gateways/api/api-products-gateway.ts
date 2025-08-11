import { ProductsGateway } from '@/application/gateways/products-gateway';
import { Product } from '@/domain/entities/product';
import { Injectable } from '@nestjs/common';

interface ProductResponse {
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
}

@Injectable()
export class ApiProductsGateway implements ProductsGateway {
  private readonly apiUrl = 'https://fakestoreapi.com/';

  async listProducts() {
    const response = await fetch(`${this.apiUrl}/products`);
    const productsData = await response.json();
    const products = productsData.map(
      (item: ProductResponse) =>
        new Product(
          item.id,
          item.title,
          item.description,
          item.category,
          item.image,
          item.price,
          item.rating,
        ),
    );

    return products;
  }

  async findProductById(productId: number) {
    const response = await fetch(`${this.apiUrl}/products/${productId}`);
    const productData = await response.json();
    const product = new Product(
      productData.id,
      productData.title,
      productData.description,
      productData.category,
      productData.image,
      productData.price,
      productData.rating,
    );

    return product;
  }
}
