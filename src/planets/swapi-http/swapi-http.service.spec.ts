import { Test, TestingModule } from '@nestjs/testing';
import { SwapiHttpService } from './swapi-http.service';

describe('SwapiHttpService', () => {
  let provider: SwapiHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwapiHttpService],
    }).compile();

    provider = module.get<SwapiHttpService>(SwapiHttpService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
