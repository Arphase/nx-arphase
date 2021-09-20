import { Photo } from '@musicr/domain';
import { Controller, Delete, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';

import { PhotosService } from '../services/photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.photosService.uploadPhoto(file.buffer, file.originalname);
  }

  @Delete(':id')
  async deletePhoto(@Param('id', ParseIntPipe) id: number): Promise<Photo> {
    return this.photosService.deletePhoto(id);
  }
}
