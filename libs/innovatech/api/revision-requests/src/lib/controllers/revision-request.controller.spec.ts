import { createCollectionResponse } from '@arphase/api/core';
import { createNestApp } from '@arphase/api/testing';
import { dropEntities } from '@arphase/api/db';
import { DeepPartial } from '@arphase/common';
import { AuthModule } from '@innovatech/api/auth/feature';
import { InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import { CompanyEntity, GroupEntity, RevisionRequestEntity, UserEntity, VehicleEntity } from '@innovatech/api/domain';
import { RevisionRequest, UserRoles, Vehicle } from '@innovatech/common/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { RevisionRequestsModule } from '../revision-requests.module';

describe('RevisionsController', () => {
  let app: INestApplication;
  let repository: Repository<RevisionRequestEntity>;
  let vehicleRepository: Repository<VehicleEntity>;
  let token: string;
  let connection: Connection;

  const mockedVehicle: Partial<Vehicle> = {
    brand: 'Seat',
    model: 'Ibiza',
    version: 'Style',
    year: 2020,
    vin: '37289472398473289',
    motorNumber: '37289472398473289',
    horsePower: 100,
    companyId: 1,
  };

  const mockedRevisionRequest: DeepPartial<RevisionRequest> = {
    vehicleId: 1,
    address: {
      zipcode: '64988',
      country: 'México',
      state: 'Nuevo León',
      city: 'Monterrey',
      suburb: 'Suburb',
      street: 'Street',
      externalNumber: '100',
      internalNumber: '2',
    },
    name: 'Víctor',
    phone: '8112345678',
    email: 'victor@test.com',
    additionalNotes: 'test notes',
    companyId: 1,
  };

  const revisionRequestProperties: string[] = ['name', 'phone', 'email', 'additionalNotes'];
  const addressProperties: string[] = [
    'zipcode',
    'country',
    'state',
    'city',
    'suburb',
    'street',
    'externalNumber',
    'internalNumber',
  ];
  const vehicleProperties: string[] = [
    'brand',
    'model',
    'version',
    'year',
    'vin',
    'motorNumber',
    'horsePower',
    'companyId',
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InnovatechApiDbModule, RevisionRequestsModule, AuthModule, TypeOrmModule.forFeature([VehicleEntity])],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(RevisionRequestEntity));
    vehicleRepository = module.get(getRepositoryToken(VehicleEntity));
    connection = module.get(Connection);
    await insertGroup(connection);
    await insertUser(connection, {
      firstName: 'Víctor',
      lastName: 'Martínez',
      secondLastName: 'Valdés',
      email: 'victor.martinez@mailinator.com',
      password: 'Innovatech123@',
      role: UserRoles.agencyUser,
      companyId: 1,
    });
    await vehicleRepository.create(mockedVehicle).save();

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

  afterEach(async () => await repository.query(`DELETE FROM "revisionRequests";`));

  afterAll(async () => {
    await dropEntities([CompanyEntity, GroupEntity, UserEntity, VehicleEntity, RevisionRequestEntity], connection);
    await app.close();
  });

  it('should get the index', async () => {
    const newRevisionRequest = await repository.create(mockedRevisionRequest).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/revision-requests`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { info, results } = createCollectionResponse([newRevisionRequest], 10, 1, 1);

    expect(body.results[0].id).toEqual(results[0].id);
    expect(body.results.length).toEqual(1);
    expect(body.info).toEqual(info);
  });

  it('should get an item', async () => {
    const newRevisionRequest = await repository.create(mockedRevisionRequest).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/revision-requests/${newRevisionRequest.id}/`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(pick(body, revisionRequestProperties)).toEqual(pick(newRevisionRequest, revisionRequestProperties));
    expect(pick(body.address, addressProperties)).toEqual(pick(newRevisionRequest.address, addressProperties));
    expect(pick(body.vehicle, vehicleProperties)).toEqual(pick(mockedVehicle, vehicleProperties));
  });

  it('should create an item', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/revision-requests')
      .auth(token, { type: 'bearer' })
      .send(mockedRevisionRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOne({ id: body.id }, { relations: ['address', 'vehicle'] });

    expect(omit(mockedRevisionRequest, ['address', 'companyId', 'vehicleId'])).toEqual(
      pick(expected, revisionRequestProperties)
    );
    expect(mockedRevisionRequest.address).toEqual(pick(expected.address, addressProperties));
    expect(mockedVehicle).toEqual(pick(expected.vehicle, vehicleProperties));
  });

  it('should update an item', async () => {
    const newRevisionRequest = await repository.create(mockedRevisionRequest).save();
    const updatedRevisionRequest: Partial<RevisionRequest> = {
      id: newRevisionRequest.id,
      address: {
        id: newRevisionRequest.address.id,
        zipcode: '64983',
        country: 'United Stated',
        state: 'Texas',
        city: 'San Antonio',
        suburb: 'Suburb US',
        street: 'Street US',
        externalNumber: '2000',
        internalNumber: '10',
      },
      name: 'Víctor 2',
      phone: '81143218765',
      email: 'victor2@test.com',
      additionalNotes: 'test notes 2',
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/revision-requests/${updatedRevisionRequest.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedRevisionRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id: updatedRevisionRequest.id }, { relations: ['address', 'vehicle'] });
    expect(omit(updatedRevisionRequest, 'address')).toEqual(pick(expected, ['id', ...revisionRequestProperties]));
    expect(updatedRevisionRequest.address).toEqual(pick(expected.address, ['id', ...addressProperties]));
    expect(mockedVehicle).toEqual(pick(expected.vehicle, vehicleProperties));
  });
});
