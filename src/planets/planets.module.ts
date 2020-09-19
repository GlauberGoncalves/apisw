import { HttpModule, Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetService } from './shared/planet.service';
import { PlanetSchema} from './schemas/planet.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { SwapiHttpService } from './swapi-http/swapi-http.service'

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Planet', schema: PlanetSchema}]),
        HttpModule        
    ],
    controllers: [PlanetsController],
    providers: [
        PlanetService,
        SwapiHttpService
    ]
})
export class PlanetsModule {}
