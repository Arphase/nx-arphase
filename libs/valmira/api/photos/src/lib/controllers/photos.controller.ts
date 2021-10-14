import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Photo } from '@valmira/domain';
import { Express } from 'express';
import { Multer } from 'multer';

import { PhotosService } from '../services/photos.service';

@Controller('photos')
@UseGuards(AuthGuard('jwt'))
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File): Promise<Photo> {
    return this.photosService.uploadPhoto(file.buffer, file.originalname);
  }

  @Delete(':id')
  async deletePhoto(@Param('id', ParseIntPipe) id: number): Promise<Photo> {
    return this.photosService.deletePhoto(id);
  }
}
