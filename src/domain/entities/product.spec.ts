import { Product } from '@/domain/entities/product';

describe('[Entity] Product', () => {
  it('should create a valid product', () => {
    const product = Product.create(
      'Product Name',
      'Product Description',
      'Product Category',
      'http://example.com/image.jpg',
      100,
    );
    expect(product.getId()).toEqual(expect.any(String));
    expect(product.getTitle()).toEqual(expect.any(String));
    expect(product.getDescription()).toEqual(expect.any(String));
    expect(product.getCategory()).toEqual(expect.any(String));
    expect(product.getImage()).toEqual(expect.any(String));
    expect(product.getPrice()).toEqual(expect.any(Number));
  });
});
