import { createCollectionResponse } from '@arphase/api/core';
import { dropEntities } from '@arphase/api/db';
import { createNestApp } from '@arphase/api/testing';
import { AuthModule } from '@innovatech/api/auth/feature';
import { InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import { CompanyEntity, GroupEntity, ProductEntity, RevisionEntity, UserEntity } from '@innovatech/api/domain';
import { Product } from '@innovatech/common/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { ProductsModule } from '../products.module';

describe('ProductsController', () => {
  let app: INestApplication;
  let repository: Repository<RevisionEntity>;
  let token: string;
  let connection: Connection;

  const mockedProduct: Partial<Product> = {
    price: 1000,
    template: 'template',
    name: 'Product',
    logo: 'logo',
    minYear: 0,
    maxYear: 10,
    minHp: 100,
    maxHp: 400,
  };

  const productProperties: string[] = ['price', 'template', 'name', 'logo', 'minYear', 'maxYear', 'minHp', 'maxHp'];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InnovatechApiDbModule, ProductsModule, AuthModule],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(ProductEntity));
    connection = module.get(Connection);
    await insertUser(connection);
    await insertGroup(connection);

    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/auth/signIn')
      .send({
        email: 'victor.martinez@mailinator.com',
        password: 'Innovatech123@',
      })
      .set('Accept', 'application/json');
    token = body.token;
  });

  afterEach(async () => await repository.query(`DELETE FROM products;`));

  afterAll(async () => {
    await dropEntities([CompanyEntity, GroupEntity, UserEntity, ProductEntity], connection);
    await app.close();
  });

  it('should get the index', async () => {
    const newProduct = await repository.create(mockedProduct).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/products`)
      .auth(token, { type: 'bearer' })
      .send(mockedProduct)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { info, results } = createCollectionResponse([newProduct], 10, 1, 1);

    expect(body.results[0].id).toEqual(results[0].id);
    expect(body.results.length).toEqual(1);
    expect(body.info).toEqual(info);
  });

  it('should get an item', async () => {
    const newProduct = await repository.create(mockedProduct).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/products/${newProduct.id}/`)
      .auth(token, { type: 'bearer' })
      .send(mockedProduct)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(pick(body, productProperties)).toEqual(pick(newProduct, productProperties));
  });

  it('should create an item', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/products')
      .auth(token, { type: 'bearer' })
      .send(mockedProduct)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOneBy({ id: body.id });

    expect(omit(mockedProduct, ['template', 'logo'])).toEqual(pick(expected, productProperties));
  });

  it('should update an item', async () => {
    const newProduct = await repository.create(mockedProduct).save();
    const updatedProduct: Partial<Product> = {
      id: newProduct.id,
      price: 2000,
      template: 'template 2',
      name: 'Product 2',
      logo: 'logo 2',
      minYear: 1,
      maxYear: 8,
      minHp: 150,
      maxHp: 350,
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/products/${updatedProduct.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedProduct)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOneBy({ id: updatedProduct.id });

    expect(omit(updatedProduct, ['template', 'logo'])).toEqual(pick(expected, ['id', ...productProperties]));
  });
});
