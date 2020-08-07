import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalityRepository } from '../data/locality.repository';
import { Connection } from 'typeorm';
import { LocalityEntity } from '../data/locality.entity';

@Injectable()
export class LocalitiesService {
  localityRepository: LocalityRepository;

  constructor(private readonly connection: Connection) {
    this.localityRepository = this.connection.getCustomRepository(
      LocalityRepository
    );
  }

  async getLocalityByZipCode(zipCode: number): Promise<LocalityEntity>  {
    const found = await this.localityRepository.findOne({
      where: { zipCode }
    });

    if (!found) {
      throw new NotFoundException(`Locality with zip code "${zipCode}" not found`);
    }

    return found;
  }
}
