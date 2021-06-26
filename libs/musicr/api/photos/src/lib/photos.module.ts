import { PhotoRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhotosController } from './controllers/photos.controller';
import { PhotosService } from './services/photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
