import { LocalityEntity, LocalityRepository } from '@ivt/a-state';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocalitiesService {
  constructor(@InjectRepository(LocalityRepository) private localityRepository: LocalityRepository) {}

  async getLocalityByZipCode(zipcode: string): Promise<LocalityEntity[]> {
    const found = await this.localityRepository.find({
      where: { zipcode },
    });

    return found;
  }
}
