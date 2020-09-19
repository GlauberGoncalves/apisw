import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { PlanetService } from './shared/planet.service';
import { Planet } from './shared/planet';
import { PlanetDTO } from './shared/planet.dto';

@Controller('planets')
export class PlanetsController {

    constructor(private planetService: PlanetService) {

    }

    @Get('/name/:search')
    async getByName(@Param('search') name:string) {
        return this.planetService.getByName(name)
    }

    @Get() 
    async getAll() : Promise<any> {
        return this.planetService.getAll()
    }

    @Get(':id') 
    async getById(@Param('id') id: string) : Promise<any> {
        return this.planetService.getById(id)
    }

    @Post() 
    async create(@Body() planet: Planet) : Promise<Planet> {
        return this.planetService.create(planet)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() planet:Planet): Promise<any> {
        return this.planetService.update(id, planet)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.planetService.delete(id)
    }

}