import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Planet } from './planet'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SwapiHttpService } from './../swapi-http/swapi-http.service';
import { PlanetDTO } from './planet.dto';

@Injectable()
export class PlanetService {

    constructor(@InjectModel('Planet') private readonly planetModel: Model<Planet>, private swapiHttp: SwapiHttpService){}

    async getAll() {
        const planets = await this.planetModel.find().exec()

        const planetsDTO = planets.map(async planet => {
            const planetResponse: PlanetDTO = new PlanetDTO()
            planetResponse.init(planet)
            planetResponse.aparitions = await this.swapiHttp.getNumberApparitionsByName(planetResponse.name).toPromise();
            return planetResponse
        });

        return (async () => {
            const allResult = Promise.all(planetsDTO)
            return allResult
        })();
    }

    async getById(id: string) {
        try{
            const planet = await this.planetModel.findById(id).exec()
            const planetResponse = new PlanetDTO()

            planetResponse.init(planet)
            planetResponse.aparitions = await this.swapiHttp.getNumberApparitionsByName(planetResponse.name).toPromise();

            return planetResponse
        } catch(e){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'this planet was not found',
            }, HttpStatus.FORBIDDEN);
        }
     }

    async create(planet: Planet) {
        try {
            const createdPlanet = new this.planetModel(planet)
            return await createdPlanet.save()
        } catch (e) {
            throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }
     }

    async update(id: string, planet:Planet) {
        try {
            await this.planetModel.updateOne({_id: id}, planet).exec()
            return this.getById(id)
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'this id was not found',
            }, HttpStatus.NOT_FOUND);
        }
     }

    async delete(id: string) {
        return await this.planetModel.deleteOne({ _id: id }).exec()
    }

    async getByName(planetName:string) {
        const planet =await this.planetModel.findOne({name:planetName}).exec()
        const planetResponse = new PlanetDTO()

        planetResponse.init(planet)
        planetResponse.aparitions = await this.swapiHttp.getNumberApparitionsByName(planetResponse.name).toPromise();

        return planetResponse
    }

}
