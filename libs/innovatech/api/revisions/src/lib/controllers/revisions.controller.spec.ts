import { createCollectionResponse } from '@arphase/api/core';
import { createNestApp, dropEntities } from '@arphase/api/testing';
import { DeepPartial } from '@arphase/common';
import { AuthModule } from '@innovatech/api/auth/feature';
import { InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import { CompanyEntity, GroupEntity, RevisionEntity, UserEntity, VehicleEntity } from '@innovatech/api/domain';
import { Revision, RevisionStatus, Vehicle } from '@innovatech/common/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { pick } from 'lodash';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { RevisionsModule } from '../revisions.module';

describe('RevisionsController', () => {
  let app: INestApplication;
  let repository: Repository<RevisionEntity>;
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

  const mockedRevision: DeepPartial<Revision> = {
    report: {},
    vehicleId: 1,
    observations: 'It works!',
    status: RevisionStatus.elegible,
    kilometrage: 1000,
    reviewdBy: 'Víctor',
  };

  const revisionProperties: string[] = ['report', 'observations', 'status', 'vehicleId', 'kilometrage', 'reviewdBy'];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InnovatechApiDbModule, RevisionsModule, AuthModule],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(RevisionEntity));
    vehicleRepository = module.get(getRepositoryToken(VehicleEntity));
    connection = module.get(Connection);
    await insertUser(connection);
    await insertGroup(connection);
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

  afterEach(async () => await repository.query(`DELETE FROM revisions;`));

  afterAll(async () => {
    await dropEntities([CompanyEntity, GroupEntity, UserEntity, VehicleEntity, RevisionEntity], connection);
    await app.close();
  });

  it('should get the revision index', async () => {
    const newRevision = await repository.create(mockedRevision).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/revisions`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { info, results } = createCollectionResponse([newRevision], 10, 1, 1);

    expect(body.results[0].id).toEqual(results[0].id);
    expect(body.results.length).toEqual(1);
    expect(body.info).toEqual(info);
  });

  it('should get a revision', async () => {
    const newRevision = await repository.create(mockedRevision).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/revisions/${newRevision.id}/`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(pick(body, revisionProperties)).toEqual(
      pick({ ...newRevision, status: RevisionStatus[RevisionStatus.elegible] }, revisionProperties)
    );
  });

  it('should create a revision', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/revisions')
      .auth(token, { type: 'bearer' })
      .send({ ...mockedRevision, status: RevisionStatus[RevisionStatus.elegible] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOne({ id: body.id });

    expect({ ...mockedRevision, status: RevisionStatus[RevisionStatus.elegible] }).toEqual(
      pick(expected, revisionProperties)
    );
  });

  it('should update a revision', async () => {
    const newRevision = await repository.create(mockedRevision).save();
    const updatedRevision: Partial<Revision> = {
      id: newRevision.id,
      vehicleId: 1,
      observations: 'It does not work!',
      status: RevisionStatus[RevisionStatus.notElegible],
      kilometrage: 2000,
      reviewdBy: 'Andrés',
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/revisions/${updatedRevision.id}`)
      .auth(token, { type: 'bearer' })
      .send(updatedRevision)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id: updatedRevision.id });
    expect(updatedRevision).toEqual(
      pick(expected, ['id', ...revisionProperties.filter(property => property !== 'report')])
    );
  });

  it('should delete a revision', async () => {
    const { id } = await repository.create(mockedRevision).save();

    await supertest
      .agent(app.getHttpServer())
      .delete(`/revisions/${id}`)
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id });
    expect(expected).toBeFalsy();
  });
});
