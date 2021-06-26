import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductArrayPropertiesService } from './update-product-array-properties.service';

describe('UpdateProductArrayPropertiesService', () => {
  let service: UpdateProductArrayPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProductArrayPropertiesService],
    }).compile();

    service = module.get<UpdateProductArrayPropertiesService>(UpdateProductArrayPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
