import { LocalityEntity } from '@innovatech/api/domain';
import { Locality } from '@innovatech/common/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalitiesService {
  constructor(@InjectRepository(LocalityEntity) private localityRepository: Repository<LocalityEntity>) {}

  async getLocalityByZipCode(zipcode: string): Promise<Locality[]> {
    return await this.localityRepository.find({ where: { zipcode } });
  }
}
