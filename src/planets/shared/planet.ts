import { Document } from 'mongoose'

export class Planet extends Document{
    name: string;
    climate: string;
    terrain: string;
}
