import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetService } from './shared/planet.service';

@Module({
    controllers: [PlanetsController],
    providers: [PlanetService]
})
export class PlanetsModule {}
