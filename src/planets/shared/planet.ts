import { Document } from 'mongoose'

export class Planet extends Document{
    name: String;
    climate: String;
    terrain: String;
    aparitions: number;
}
