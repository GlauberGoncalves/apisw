
import { HttpService, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import {map} from "rxjs/operators";
import { PlanetResponse } from './planet.response';

const FIRST_RESULT = 0
const EMPTY = 0

@Injectable()
export class SwapiHttpService {

    baseUrl = `https://swapi.dev/api`;

    constructor(private readonly httpService:HttpService) { }
    
    getNumberApparitionsByName(name:String): Observable<number> {        
        return this.httpService.get<{number: number[]}>(`${this.baseUrl}/planets/?search=${name}`)
            .pipe(
                map((response:any) => {                    
                    const planet:PlanetResponse = response.data.results[FIRST_RESULT]
                    return planet ? planet.films.length : EMPTY
                })
            )
    }
}
