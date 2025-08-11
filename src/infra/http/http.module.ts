import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts-module';
import { ProdutsModule } from './modules/products-module';

@Module({
  imports: [AccountsModule, ProdutsModule],
})
export class HttpModule {}
