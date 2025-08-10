import { Price } from '@/domain/value-objects/price';
import { Url } from '@/domain/value-objects/url';

export class Product {
  private productId: number;
  private title: string;
  private description: string;
  private category: string;
  private image: Url;
  private price: Price;
  private rating: {
    rate: number;
    count: number;
  };

  constructor(
    productId: number,
    title: string,
    description: string,
    category: string,
    image: string,
    price: number,
    rating: { rate: number; count: number } = { rate: 0, count: 0 },
  ) {
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.image = new Url(image);
    this.price = new Price(price);
    this.rating = rating;
  }

  getId() {
    return this.productId;
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

  getRating() {
    return this.rating;
  }
}
