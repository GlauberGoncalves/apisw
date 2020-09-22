import { Planet } from "./planet";

export class PlanetDTO {
    id: string
    name: string;    
    climate: string;
    terrain: string;
    appearances: number;

    init(planet: Planet){
        this.id = planet.id
        this.name = planet.name
        this.climate = planet.climate
        this.terrain = planet.terrain
    }
}
