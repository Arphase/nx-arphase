import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from '@valmira/api/domain';
import { Photo } from '@valmira/domain';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(PhotoEntity) private photoRepository: Repository<PhotoEntity>) {}

  async uploadPhoto(dataBuffer: Buffer, filename: string): Promise<Photo> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.photoRepository.create({ key: uploadResult.Key, path: uploadResult.Location });
    return this.photoRepository.save(newFile);
  }

  async deletePhoto(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ id });
    if (!photo) {
      throw new NotFoundException(`Photo with id ${id} not found`);
    }
    const s3 = new S3();
    const result = await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: photo.key,
      })
      .promise();
    if (result.$response.data) {
      await this.photoRepository.delete(photo);
    }
    return photo;
  }
}
