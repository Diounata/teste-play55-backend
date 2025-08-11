import { ProductsGateway } from '@/application/gateways/products-gateway';
import { Module } from '@nestjs/common';
import { ApiProductsGateway } from './api/api-products-gateway';

@Module({
  providers: [
    {
      provide: ProductsGateway,
      useClass: ApiProductsGateway,
    },
  ],
  exports: [ProductsGateway],
})
export class GatewayModule {}
