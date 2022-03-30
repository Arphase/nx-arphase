import { dropEntities } from '@arphase/api/db';
import { createNestApp } from '@arphase/api/testing';
import { AuthModule } from '@musicr/api/auth';
import { insertUser, MusicrApiDbModule } from '@musicr/api/db';
import { PhotoEntity, UserEntity } from '@musicr/api/domain';
import { Photo } from '@musicr/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { PhotosModule } from '../photos.module';

describe('PhotosController', () => {
  let app: INestApplication;
  let repository: Repository<PhotoEntity>;
  let token: string;
  let connection: Connection;

  const mockPhoto: Partial<Photo> = {
    key: 'test',
    url: 'test',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MusicrApiDbModule, PhotosModule, AuthModule],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(PhotoEntity));
    connection = module.get(Connection);
    await insertUser(connection);

    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: 'victor.martinez@mailinator.com',
        password: 'MusicRevolution123@',
      })
      .set('Accept', 'application/json');
    token = body.token;
  });

  afterEach(async () => await repository.query(`DELETE FROM photos;`));

  afterAll(async () => {
    await dropEntities([UserEntity, PhotoEntity], connection);
    await app.close();
  });

  it('should delete a photo', async () => {
    const { id } = await repository.create(mockPhoto).save();

    await supertest
      .agent(app.getHttpServer())
      .delete(`/photos/${id}`)
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id });
    expect(expected).toBeFalsy();
  });
});
