import { AuthModule } from '@musicr/api/auth';
import { PhotoEntity } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhotosController } from './controllers/photos.controller';
import { PhotosService } from './services/photos.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
