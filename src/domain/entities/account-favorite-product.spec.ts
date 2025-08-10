import { ulid } from 'ulid';
import { AccountFavoriteProduct } from './account-favorite-product';

describe('[Entity] Account favorite product', () => {
  it('should create a valid account favorite product', () => {
    const accountFavoriteProduct = AccountFavoriteProduct.create(
      ulid(),
      1,
      new Date(),
    );
    expect(accountFavoriteProduct.getId()).toEqual(expect.any(String));
    expect(accountFavoriteProduct.getAccountId()).toEqual(expect.any(String));
    expect(accountFavoriteProduct.getProductId()).toEqual(expect.any(Number));
    expect(accountFavoriteProduct.getCreatedAt()).toBeInstanceOf(Date);
  });
});
