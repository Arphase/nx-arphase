import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { LocalityEntity } from '../data/locality.entity';
import { LocalityRepository } from '../data/locality.repository';

@Injectable()
export class LocalitiesService {
  localityRepository: LocalityRepository;

  constructor(private readonly connection: Connection) {
    this.localityRepository = this.connection.getCustomRepository(
      LocalityRepository
    );
  }

  async getLocalityByZipCode(zipCode: number): Promise<LocalityEntity[]> {
    const found = await this.localityRepository.find({
      where: { zipCode },
    });

    return found;
  }
}
