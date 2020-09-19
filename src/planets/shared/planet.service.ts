import { Injectable } from '@nestjs/common'
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
            let planetResponse: PlanetDTO = new PlanetDTO()
            planetResponse.init(planet)            
            planetResponse.aparitions = await this.swapiHttp.getNumberApparitionsByName(planetResponse.name).toPromise();
            console.log(planetResponse)
            return planetResponse
        });

        return (async () => {
            const allResult = Promise.all(planetsDTO)      
            console.log(allResult)
            return allResult
        })();                
    }

    async getById(id: string) {        
        
        const planet = await this.planetModel.findById(id).exec()        
        const planetResponse = new PlanetDTO()
        
        planetResponse.init(planet)
        planetResponse.aparitions = await this.swapiHttp.getNumberApparitionsByName(planetResponse.name).toPromise();        
        
        return planetResponse
     }

    async create(planet: Planet) {
        const createdPlanet = new this.planetModel(planet)
        return await createdPlanet.save()
     }

    async update(id: string, planet:Planet) {
        await this.planetModel.updateOne({_id: id}, planet).exec()
        return this.getById(id)
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
