import * as mongoose from 'mongoose'


export const PlanetSchema = new mongoose.Schema({    
    name: String,
    climate: String,
    terrain: String    
})