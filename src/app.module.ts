import {CacheModule, Module, CacheInterceptor} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsModule } from './planets/planets.module';
import {ConfigModule} from "@nestjs/config";
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from '../node_modules/cache-manager-redis-store';
//import * as redisStore from 'cache-manager-redis-store';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`),
    CacheModule.register({
      ttl: 60,
      max: 10,
      store: redisStore,
      host: process.env.DBCACHE_HOST,
      port: process.env.DBCACHE_PORT
    }),
    PlanetsModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
