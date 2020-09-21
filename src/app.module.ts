import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsModule } from './planets/planets.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`),
    PlanetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
