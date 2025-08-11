import { DatabaseConnection } from '@/application/database/database-connection';
import { AccountFavoriteProductsRepository } from '@/application/repositories/account-favorite-products-repository';
import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Module } from '@nestjs/common';
import { PrismaDatabaseConnectionService } from './prisma/prisma-database-connection.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountFavoriteProductsRepository } from './prisma/repositories/prisma-account-favorite-products-repository';
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: DatabaseConnection,
      useClass: PrismaDatabaseConnectionService,
    },
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
    {
      provide: AccountFavoriteProductsRepository,
      useClass: PrismaAccountFavoriteProductsRepository,
    },
  ],
  exports: [
    PrismaService,
    DatabaseConnection,
    AccountsRepository,
    AccountFavoriteProductsRepository,
  ],
})
export class DatabaseModule {}
