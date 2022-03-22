import { createCollectionResponse } from '@arphase/api/core';
import { createNestApp } from '@arphase/api/testing';
import { DeepPartial } from '@arphase/common';
import { AuthModule } from '@innovatech/api/auth/feature';
import { InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import {
  AddressEntity,
  ClientEntity,
  CompanyEntity,
  GroupEntity,
  GuaranteeEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  ProductEntity,
  UserEntity,
  VehicleEntity,
} from '@innovatech/api/domain';
import { Guarantee, GuaranteeStatus, PersonTypes, Product, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { dropEntities } from '@arphase/api/db';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { pick } from 'lodash';
import supertest from 'supertest';
import { Connection, Repository } from 'typeorm';

import { GuaranteesModule } from '../guarantees.module';

describe('GuaranteesController', () => {
  let app: INestApplication;
  let repository: Repository<GuaranteeEntity>;
  let vehicleRepository: Repository<VehicleEntity>;
  let productRepository: Repository<ProductEntity>;
  let physicalPersonRepository: Repository<PhysicalPersonEntity>;
  let token: string;
  let connection: Connection;

  const mockedVehicle: Partial<Vehicle> = {
    brand: 'Seat',
    model: 'Ibiza',
    version: 'Style',
    year: 2020,
    vin: '37289472398473289',
    motorNumber: '37289472398473289',
    horsePower: 200,
    companyId: 1,
    status: VehicleStatus.elegible,
  };

  const mockedGuarantee: DeepPartial<Guarantee> = {
    client: {
      personType: PersonTypes.physical,
      physicalInfo: {
        name: 'Víctor',
        lastName: 'Martínez',
        secondLastName: 'Valdés',
        birthDate: '1990-10-10',
      },
      rfc: 'MAVV951102311',
      phone: '8112345678',
      email: 'victor@test.com',
      address: {
        zipcode: '64988',
        country: 'México',
        state: 'Nuevo León',
        city: 'Monterrey',
        suburb: 'Suburb',
        street: 'Street',
        externalNumber: '100',
      },
      salesPlace: 'Sales place',
    },
    vehicleId: 1,
    kilometrageStart: 10000,
    kilometrageEnd: 20000,
    companyId: 1,
    userId: 1,
    productId: 1,
    startDate: '2022-10-10',
    endDate: '2023-10-10',
  };

  const mockedProduct: Partial<Product> = {
    price: 1000,
    template: '',
    name: 'Product',
    logo: '',
    minYear: 0,
    maxYear: 10,
    minHp: 100,
    maxHp: 300,
  };

  const guaranteeProperties: string[] = ['kilometrageStart', 'kilometrageEnd'];
  const clientProperties: string[] = ['personType', 'rfc', 'phone', 'email', 'salesPlace'];
  const phyisicalInfoProperties: string[] = ['name', 'lastName', 'secondLastName'];
  const moralInfoProperties: string[] = ['businessName', 'adviser'];
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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        InnovatechApiDbModule,
        GuaranteesModule,
        AuthModule,
        TypeOrmModule.forFeature([ProductEntity, PhysicalPersonEntity]),
      ],
    }).compile();
    app = await createNestApp(module);
    repository = module.get(getRepositoryToken(GuaranteeEntity));
    vehicleRepository = module.get(getRepositoryToken(VehicleEntity));
    productRepository = module.get(getRepositoryToken(ProductEntity));
    physicalPersonRepository = module.get(getRepositoryToken(PhysicalPersonEntity));
    connection = module.get(Connection);
    await insertUser(connection);
    await insertGroup(connection);
    await vehicleRepository.create(mockedVehicle).save();
    await productRepository.create(mockedProduct).save();

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

  afterEach(async () => {
    await repository.query(`DELETE FROM "moralPersons";`);
    await repository.query(`DELETE FROM "physicalPersons";`);
    await repository.query(`DELETE FROM clients;`);
    await repository.query(`DELETE FROM guarantees;`);
  });

  afterAll(async () => {
    await dropEntities(
      [
        CompanyEntity,
        GroupEntity,
        UserEntity,
        VehicleEntity,
        ProductEntity,
        AddressEntity,
        ClientEntity,
        PhysicalPersonEntity,
        MoralPersonEntity,
        GuaranteeEntity,
      ],
      connection
    );
    await app.close();
  });

  it('should get the index', async () => {
    const newGuarantee = await repository.create(mockedGuarantee).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/guarantees`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { info, results } = createCollectionResponse([newGuarantee], 10, 1, 1);

    expect(body.results[0].id).toEqual(results[0].id);
    expect(body.results.length).toEqual(1);
    expect(body.info).toEqual(info);
  });

  it('should get an item', async () => {
    const newGuarantee = await repository.create(mockedGuarantee).save();

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/guarantees/${newGuarantee.id}/`)
      .auth(token, { type: 'bearer' })
      .send(mockedVehicle)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { client } = body as Guarantee;
    const { physicalInfo, address } = client;

    expect(pick(body, guaranteeProperties)).toEqual(
      pick({ ...newGuarantee, status: GuaranteeStatus[GuaranteeStatus.outstanding] }, guaranteeProperties)
    );
    expect(pick(body.client, clientProperties)).toEqual(
      pick({ ...newGuarantee.client, personType: PersonTypes[PersonTypes.physical] }, clientProperties)
    );
    expect(pick(physicalInfo, phyisicalInfoProperties)).toEqual(
      pick(newGuarantee.client.physicalInfo, phyisicalInfoProperties)
    );
    expect(pick(address, addressProperties)).toEqual(pick(newGuarantee.client.address, addressProperties));
  });

  it('should create an item', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/guarantees')
      .auth(token, { type: 'bearer' })
      .send({
        ...mockedGuarantee,
        client: { ...mockedGuarantee.client, personType: PersonTypes[PersonTypes.physical] },
      } as Guarantee)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOne({ id: body.id }, { relations: ['client'] });

    const { client } = body as Guarantee;
    const { physicalInfo, address } = client;

    expect(pick(body, guaranteeProperties)).toEqual(
      pick({ ...expected, status: GuaranteeStatus[GuaranteeStatus.outstanding] }, guaranteeProperties)
    );
    expect(pick(client, clientProperties)).toEqual(
      pick({ ...expected.client, personType: PersonTypes[PersonTypes.physical] }, clientProperties)
    );
    expect(pick(physicalInfo, phyisicalInfoProperties)).toEqual(
      pick(expected.client.physicalInfo, phyisicalInfoProperties)
    );
    expect(pick(address, addressProperties)).toEqual(pick(expected.client.address, addressProperties));
  });

  it('should update an item', async () => {
    const newGuarantee = await repository.create(mockedGuarantee).save();
    const updatedGuarantee: DeepPartial<Guarantee> = {
      id: newGuarantee.id,
      client: {
        id: newGuarantee.client.id,
        personType: PersonTypes.moral,
        rfc: 'MAV951102311',
        phone: '8112345876',
        email: 'victor.company@test.com',
        address: {
          id: newGuarantee.client.address.id,
          zipcode: '64983',
          country: 'United Stated',
          state: 'Texas',
          city: 'San Antonio',
          suburb: 'Suburb US',
          street: 'Street US',
          externalNumber: '2000',
          internalNumber: '10',
        },
        salesPlace: 'Sales place updated',
        moralInfo: {
          businessName: 'Arphase',
          adviser: 'Víctor Martínez',
          constitutionDate: '2020-10-10',
        },
      },
      vehicleId: 1,
      kilometrageStart: 20000,
      kilometrageEnd: 30000,
      companyId: 1,
      userId: 1,
      productId: 1,
      startDate: '2023-10-10',
      endDate: '2024-10-10',
    };

    await supertest
      .agent(app.getHttpServer())
      .put(`/guarantees/${updatedGuarantee.id}`)
      .auth(token, { type: 'bearer' })
      .send({
        ...updatedGuarantee,
        client: { ...updatedGuarantee.client, personType: PersonTypes[PersonTypes.moral] },
      } as Guarantee)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { client } = updatedGuarantee;
    const { moralInfo, address } = client;

    const expected = await repository.findOne({ id: updatedGuarantee.id }, { relations: ['client'] });

    expect(pick(updatedGuarantee, guaranteeProperties)).toEqual(
      pick({ ...expected, status: GuaranteeStatus[GuaranteeStatus.outstanding] }, guaranteeProperties)
    );
    expect(pick({ ...client, personType: PersonTypes[PersonTypes.moral] }, clientProperties)).toEqual(
      pick(expected.client, clientProperties)
    );
    expect(pick(moralInfo, moralInfoProperties)).toEqual(pick(expected.client.moralInfo, moralInfoProperties));
    expect(pick(address, addressProperties)).toEqual(pick(expected.client.address, addressProperties));

    const phyisicalPersons = await physicalPersonRepository.find();

    expect(phyisicalPersons.length).toEqual(0);
  });

  it('should delete a revision', async () => {
    const { id } = await repository.create(mockedGuarantee).save();

    await supertest
      .agent(app.getHttpServer())
      .delete(`/guarantees/${id}`)
      .auth(token, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expected = await repository.findOne({ id });
    expect(expected).toBeFalsy();
  });
});
