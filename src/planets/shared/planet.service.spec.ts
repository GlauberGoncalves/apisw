import { Test, TestingModule } from '@nestjs/testing';
import { PlanetService } from './planet.service';
import { getModelToken } from '@nestjs/mongoose';
import { SwapiHttpService } from '../swapi-http/swapi-http.service';
import TestUtil from '../../common/test/TestUtil';
import { Model } from 'mongoose';
import { Planet } from './planet';

describe('PlanetService', () => {
  let service: PlanetService;
  let swapi: SwapiHttpService;
  let model: Model<Planet>;
  
  const mockModel = {
    new: jest.fn().mockResolvedValue(TestUtil.giveMeAValidPlanet()),
    constructor: jest.fn().mockResolvedValue(TestUtil.giveMeAValidPlanet()),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
    exec: jest.fn()
  }

  const mockSwapi = {
    getNumberApparitionsByName: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetService,
        {
          provide: getModelToken('Planet'),
          useValue: mockModel
        },
        {
          provide: SwapiHttpService,
          useValue: mockSwapi
        }
      ],
    }).compile();

    service = module.get<PlanetService>(PlanetService);
    model = module.get<Model<Planet>>(getModelToken('Planet'));
    swapi = module.get<SwapiHttpService>(SwapiHttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getAll', () => {
    it('should be return all Planets', async () => {   
      
      const planet = TestUtil.giveMeAValidPlanet();

      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([planet, planet]),        
      } as any);

      jest.spyOn(swapi, 'getNumberApparitionsByName').mockReturnValue({
        toPromise: jest.fn().mockResolvedValueOnce(4)
      } as any)

      const planets = await service.getAll();
      expect(planets).toHaveLength(2);       
      expect(mockModel.find).toHaveBeenCalledTimes(1)
      expect(swapi.getNumberApparitionsByName).toHaveBeenCalledTimes(2)
    });
  });
  
  describe('findById', () => {
    it('should be return one PlanetDTO when pass id', async () => {   
      
      const planet = TestUtil.giveMeAValidPlanet();
      const planetDTO = TestUtil.giveMeAValidPlanetDTO();
      planetDTO.aparitions = 10

      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(planet),        
      } as any);

      jest.spyOn(swapi, 'getNumberApparitionsByName').mockReturnValue({
        toPromise: jest.fn().mockResolvedValueOnce(10)
      } as any)

      const foundPlanet = await service.getById('an id');      
      expect(foundPlanet).toEqual(planetDTO)
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
      expect(swapi.getNumberApparitionsByName).toHaveBeenCalledTimes(1)      
    });
  });

  describe('getByName', () => {
    it('should findOne by name', async () => {
      
      const NUMBER_APARITIONS = 10

      const planet = TestUtil.giveMeAValidPlanet();
      const planetDTO = TestUtil.giveMeAValidPlanetDTO();
      
      planetDTO.aparitions = NUMBER_APARITIONS      
      
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(planetDTO)
      } as any);
      
      jest.spyOn(swapi, 'getNumberApparitionsByName').mockReturnValue({
        toPromise: jest.fn().mockResolvedValueOnce(NUMBER_APARITIONS)
      } as any)

      const planetResponse = await service.getByName(planet.name.toString())
      expect(planetResponse).toEqual(planetDTO);
    });
  });

});
