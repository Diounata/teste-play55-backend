import { ListAccountFavoriteProductsQuery } from '@/application/queries/products/list-account-favorite-products';
import { ListProductsQuery } from '@/application/queries/products/list-products';
import { FavoriteProductUseCase } from '@/application/usecases/products/favorite-product';
import { UnfavoriteProductUseCase } from '@/application/usecases/products/unfavorite-product';
import { DatabaseModule } from '@/infra/database/database.module';
import { GatewayModule } from '@/infra/gateways/gateway.module';
import { Module } from '@nestjs/common';
import { FavoriteProductController } from '../controllers/products/favorite-product.controller';
import { ListAccountFavoriteProductsController } from '../controllers/products/list-account-favorite-products.controller';
import { ListProductsController } from '../controllers/products/list-products.controller';
import { UnfavoriteProductController } from '../controllers/products/unfavorite-product.controller';

@Module({
  imports: [DatabaseModule, GatewayModule],
  controllers: [
    ListProductsController,
    ListAccountFavoriteProductsController,
    FavoriteProductController,
    UnfavoriteProductController,
  ],
  providers: [
    ListProductsQuery,
    ListAccountFavoriteProductsQuery,
    FavoriteProductUseCase,
    UnfavoriteProductUseCase,
  ],
})
export class ProdutsModule {}
