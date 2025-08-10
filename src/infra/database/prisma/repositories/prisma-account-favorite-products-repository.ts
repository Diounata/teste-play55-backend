import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountFavoriteProduct } from '@/domain/entities/account-favorite-product';
import { Injectable } from '@nestjs/common';
import { PrismaAccountFavoriteProductsMapper } from '../mappers/prisma-account-favorite-products-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountFavoriteProductsRepository
  implements AccountFavoriteProductsRepository
{
  constructor(private prisma: PrismaService) {}

  async favoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void> {
    await this.prisma.accountFavoriteProduct.create({
      data: PrismaAccountFavoriteProductsMapper.toPrisma(
        accountFavoriteProduct,
      ),
    });
  }

  async unfavoriteProduct(
    accountFavoriteProduct: AccountFavoriteProduct,
  ): Promise<void> {
    await this.prisma.accountFavoriteProduct.delete({
      where: {
        id: accountFavoriteProduct.getId(),
      },
    });
  }
  async listAccountFavoriteProducts(
    accountId: string,
  ): Promise<AccountFavoriteProduct[]> {
    const favorites = await this.prisma.accountFavoriteProduct.findMany({
      where: {
        accountId,
      },
    });
    return favorites.map((favorite) =>
      PrismaAccountFavoriteProductsMapper.toDomain(favorite),
    );
  }

  async findAccountFavoriteProduct(
    accountId: string,
    productId: number,
  ): Promise<AccountFavoriteProduct | null> {
    const favorite = await this.prisma.accountFavoriteProduct.findFirst({
      where: {
        accountId,
        productId,
      },
    });
    return favorite
      ? PrismaAccountFavoriteProductsMapper.toDomain(favorite)
      : null;
  }
}
