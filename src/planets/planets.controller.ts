import { Body, Controller, Delete, Get, Param, Put, Post } from '@nestjs/common';
import { PlanetService } from './shared/planet.service';
import { Planet } from './shared/planet';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { PlanetDTO } from './shared/planet.dto';

@Controller('planets')
@ApiTags('planets')
export class PlanetsController {

    constructor(private planetService: PlanetService) { }

    @Get('/name/:name')
    @ApiOperation({ summary: 'Search for a planet by its name' })
    async getByName(@Param('name') name:string) {
        return this.planetService.getByName(name)
    }

    @Get()
    @ApiOperation({ summary: 'Get All planets' })
    async getAll(): Promise<PlanetDTO[]> {
        return this.planetService.getAll()
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Planet,
      })
    async getById(@Param('id') id: string) : Promise<any> {
        return this.planetService.getById(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a new planet' })
    async create(@Body() planet: Planet) : Promise<Planet> {
        return this.planetService.create(planet)
    }

    @Put(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Update a planet by id' })
    async update(@Param('id') id: string, @Body() planet:Planet): Promise<any> {
        return this.planetService.update(id, planet)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a planet by id' })
    async delete(@Param('id') id: string) {
        await this.planetService.delete(id)
    }

}
