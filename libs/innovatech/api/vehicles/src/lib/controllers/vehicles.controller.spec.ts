import { createCollectionResponse } from '@arphase/api/core';
import { dropEntities } from '@arphase/api/db';
import { createNestApp } from '@arphase/api/testing';
import { AuthModule } from '@innovatech/api/auth/feature';
import { InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import { CompanyEntity, GroupEntity, UserEntity, VehicleEntity } from '@innovatech/api/domain';
import { Vehicle } from '@innovatech/common/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { pick } from 'lodash';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehiclesModule } from '../vehicles.module';

describe('VehiclesController', () => {
  let app: INestApplication;
  let repository: Repository<VehicleEntity>;
  let token: string;
  let connection: Connection;

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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InnovatechApiDbModule, VehiclesModule, AuthModule],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(VehicleEntity));
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

  afterEach(async () => await repository.query(`DELETE FROM vehicles;`));

  afterAll(async () => {
    await dropEntities([CompanyEntity, GroupEntity, UserEntity, VehicleEntity], connection);
    await app.close();
  });

  it('should get the vehicle index', async () => {
    const newVehicle = await repository.create(mockedVehicle).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/vehicles`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { info, results } = createCollectionResponse([newVehicle], 10, 1, 1);

    expect(body.results[0].id).toEqual(results[0].id);
    expect(body.results.length).toEqual(1);
    expect(body.info).toEqual(info);
  });

  it('should get a vehicle', async () => {
    const newVehicle = await repository.create(mockedVehicle).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/vehicles/${newVehicle.id}/`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(pick(body, vehicleProperties)).toEqual(pick(newVehicle, vehicleProperties));
  });

  it('should create a vehicle', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/vehicles')
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOneBy({ id: body.id });

    expect(mockedVehicle).toEqual(pick(expected, vehicleProperties));
  });

  it('should update a vehicle', async () => {
    const newVehicle = await repository.create(mockedVehicle).save();
    const updatedVehicle: UpdateVehicleDto = {
      id: newVehicle.id,
      brand: 'Mazda',
      model: '3',
      version: 'Reference',
      year: 2021,
      vin: '37289472398473288',
      motorNumber: '37289472398473288',
      horsePower: 200,
      companyId: 1,
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/vehicles/${updatedVehicle.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOneBy({ id: updatedVehicle.id });
    expect(updatedVehicle).toEqual(pick(expected, ['id', ...vehicleProperties]));
  });

  it('should delete a vehicle', async () => {
    const { id } = await repository.create(mockedVehicle).save();

    await supertest
      .agent(app.getHttpServer())
      .delete(`/vehicles/${id}`)
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOneBy({ id });
    expect(expected).toBeFalsy();
  });
});
