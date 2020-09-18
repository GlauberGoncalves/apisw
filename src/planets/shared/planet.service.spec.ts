import { Test, TestingModule } from '@nestjs/testing';
import { PlanetService } from './planet.service';

describe('PlanetService', () => {
  let provider: PlanetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanetService],
    }).compile();

    provider = module.get<PlanetService>(PlanetService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
