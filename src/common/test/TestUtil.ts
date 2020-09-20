// import { Planet } from "../../planets/shared/planet";

import { PlanetDTO } from "../../planets/shared/planet.dto";

class Planet {
    id: string
    name: String;
    climate: String;
    terrain: String;    
}

export default class TestUtil {
    static giveMeAValidPlanet(): Planet {
        const planet = new Planet();
        planet.id = "an id"
        planet.name = "terra"
        planet.climate = "fire"   
        planet.terrain = "rock"
        return planet
    }

    static giveMeAValidPlanetDTO(): PlanetDTO {
        const planetDTO = new PlanetDTO()
        planetDTO.id = 'an id'
        planetDTO.name = 'terra'
        planetDTO.climate = 'fire'
        planetDTO.terrain = 'rock'      
        return planetDTO
    }
}