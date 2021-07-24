import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from '@valmira/api/domain';
import { Place } from '@valmira/domain';
import { Repository } from 'typeorm';

import { CreatePlaceDto } from '../dto/create-place.dto';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>) {}

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return this.placeRepository.save(place);
  }
}
