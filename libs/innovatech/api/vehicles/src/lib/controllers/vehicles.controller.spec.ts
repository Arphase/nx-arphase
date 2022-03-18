import { createCollectionResponse } from '@arphase/api/core';
import { AuthModule } from '@innovatech/api/auth/feature';
import { VehicleEntity } from '@innovatech/api/domain';
import { Vehicle } from '@innovatech/common/domain';
import { InnovatechApiDbModule } from '@ivt/innovatech/api/db';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bodyParser from 'body-parser';
import { pick } from 'lodash';
import supertest from 'supertest';
import { Repository } from 'typeorm';

import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehiclesModule } from '../vehicles.module';

describe('VehiclesController', () => {
  let app: INestApplication;
  let repository: Repository<VehicleEntity>;
  let token: string;

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

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true, transformOptions: { enableImplicitConversion: true } })
    );
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await app.init();
    repository = module.get(getRepositoryToken(VehicleEntity));
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

  afterAll(async () => await app.close());

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

    expect(pick(body, ['brand', 'model', 'version', 'year', 'vin', 'motorNumber', 'horsePower', 'companyId'])).toEqual(
      pick(newVehicle, ['brand', 'model', 'version', 'year', 'vin', 'motorNumber', 'horsePower', 'companyId'])
    );
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

    const expected = await repository.findOne({ id: body.id });

    expect(mockedVehicle).toEqual(
      pick(expected, ['brand', 'model', 'version', 'year', 'vin', 'motorNumber', 'horsePower', 'companyId'])
    );
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
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/vehicles/${updatedVehicle.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id: updatedVehicle.id });
    expect(updatedVehicle).toEqual(
      pick(expected, ['id', 'brand', 'model', 'version', 'year', 'vin', 'motorNumber', 'horsePower'])
    );
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

    const expected = await repository.findOne({ id });
    expect(expected).toBeFalsy();
  });
});
