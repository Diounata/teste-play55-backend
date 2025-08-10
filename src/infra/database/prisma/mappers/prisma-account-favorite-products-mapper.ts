import {
  Prisma,
  AccountFavoriteProduct as PrismaAccountFavoriteProduct,
} from '@prisma/client';
import { AccountFavoriteProduct } from 'src/domain/entities/account-favorite-product';

export class PrismaAccountFavoriteProductsMapper {
  static toDomain(raw: PrismaAccountFavoriteProduct): AccountFavoriteProduct {
    return new AccountFavoriteProduct(
      raw.id,
      raw.accountId,
      raw.productId,
      raw.createdAt,
    );
  }

  static toPrisma(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Prisma.AccountFavoriteProductUncheckedCreateInput {
    return {
      id: accountFavoriteProduct.getId(),
      accountId: accountFavoriteProduct.getAccountId(),
      productId: accountFavoriteProduct.getProductId(),
      createdAt: accountFavoriteProduct.getCreatedAt(),
    };
  }
}
