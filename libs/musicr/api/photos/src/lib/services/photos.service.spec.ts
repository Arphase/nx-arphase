import { PhotoRepository } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';

import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosService, { provide: PhotoRepository, useValue: {} }],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
