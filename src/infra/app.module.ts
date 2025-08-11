import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 30000 }),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    HttpModule,
  ],
})
export class AppModule {}
