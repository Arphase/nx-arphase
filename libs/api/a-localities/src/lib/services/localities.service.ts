import { LocalityEntity, LocalityRepository } from '@ivt/a-state';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class LocalitiesService {
  localityRepository: LocalityRepository;

  constructor(private readonly connection: Connection) {
    this.localityRepository = this.connection.getCustomRepository(LocalityRepository);
  }

  async getLocalityByZipCode(zipCode: string): Promise<LocalityEntity[]> {
    const found = await this.localityRepository.find({
      where: { zipCode },
    });

    return found;
  }
}
