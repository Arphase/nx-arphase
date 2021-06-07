import { LocalityRepository } from '@innovatech/api/domain';
import { Locality } from '@innovatech/common/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocalitiesService {
  constructor(@InjectRepository(LocalityRepository) private localityRepository: LocalityRepository) {}

  async getLocalityByZipCode(zipcode: string): Promise<Locality[]> {
    return await this.localityRepository.find({ where: { zipcode } });
  }
}
