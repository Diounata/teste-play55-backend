import { ulid } from 'ulid';
import { AccountFavoriteProduct } from './account-favorite-product';

describe('[Entity] Account favorite product', () => {
  it('should create a valid account favorite product', () => {
    const accountFavoriteProduct = AccountFavoriteProduct.create(
      ulid(),
      ulid(),
      new Date(),
    );
    expect(accountFavoriteProduct.getId()).toEqual(expect.any(String));
    expect(accountFavoriteProduct.getAccountId()).toEqual(expect.any(String));
    expect(accountFavoriteProduct.getProductId()).toEqual(expect.any(String));
    expect(accountFavoriteProduct.getCreatedAt()).toBeInstanceOf(Date);
  });
});
