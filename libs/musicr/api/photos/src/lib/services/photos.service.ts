import { PhotoRepository } from '@musicr/api/domain';
import { Photo } from '@musicr/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PhotosService {
  constructor(@InjectRepository(PhotoRepository) private photoRepository: PhotoRepository) {}

  async uploadPhoto(dataBuffer: Buffer, filename: string): Promise<Photo> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.photoRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.photoRepository.save(newFile);
    return newFile;
  }
}
