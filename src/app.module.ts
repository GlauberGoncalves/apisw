import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsModule } from './planets/planets.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017'),
    PlanetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}