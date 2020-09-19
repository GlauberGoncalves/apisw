import { Injectable } from '@nestjs/common'
import { Planet } from './planet'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class PlanetService {

    constructor(@InjectModel('Planet') private readonly planetModel: Model<Planet>){}

    async getAll() {
        return await this.planetModel.find().exec()
    }

    async getById(id: string) {
        return await this.planetModel.findById(id).exec()
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

}
