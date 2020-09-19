import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetService } from './shared/planet.service';
import { PlanetSchema} from './schemas/planet.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Planet', schema: PlanetSchema}])
    ],
    controllers: [PlanetsController],
    providers: [PlanetService]
})
export class PlanetsModule {}
