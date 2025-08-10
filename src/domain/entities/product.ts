import { Price } from '@/domain/value-objects/price';
import { Ulid } from '@/domain/value-objects/ulid';
import { Url } from '@/domain/value-objects/url';

export class Product {
  private productId: Ulid;
  private title: string;
  private description: string;
  private category: string;
  private image: Url;
  private price: Price;

  constructor(
    productId: string,
    title: string,
    description: string,
    category: string,
    image: string,
    price: number,
  ) {
    this.productId = new Ulid(productId);
    this.title = title;
    this.description = description;
    this.category = category;
    this.image = new Url(image);
    this.price = new Price(price);
  }

  static create(
    title: string,
    description: string,
    category: string,
    image: string,
    price: number,
  ): Product {
    const productId = Ulid.create().getValue();
    return new Product(productId, title, description, category, image, price);
  }

  getId() {
    return this.productId.getValue();
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getCategory() {
    return this.category;
  }

  getImage() {
    return this.image.getValue();
  }

  getPrice() {
    return this.price.getValue();
  }
}
