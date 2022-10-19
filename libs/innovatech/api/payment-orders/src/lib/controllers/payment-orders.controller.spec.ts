import { dropEntities } from '@arphase/api/db';
import { createNestApp } from '@arphase/api/testing';
import { DeepPartial } from '@arphase/common';
import { AuthModule } from '@innovatech/api/auth/feature';
import { dataSource, InnovatechApiDbModule, insertGroup, insertUser } from '@innovatech/api/db';
import {
  AddressEntity,
  ClientEntity,
  CompanyEntity,
  GroupEntity,
  GuaranteeEntity,
  MoralPersonEntity,
  PaymentOrderEntity,
  PhysicalPersonEntity,
  ProductEntity,
  UserEntity,
  VehicleEntity,
} from '@innovatech/api/domain';
import { Guarantee, PaymentOrder, PersonTypes, Product, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { pick } from 'lodash';
import supertest from 'supertest';
import { DataSource, Repository } from 'typeorm';

import { PaymentOrdersModule } from '../payment-orders.module';

describe('PaymentOrders Controller', () => {
  let app: INestApplication;
  let repository: Repository<PaymentOrder>;
  let guaranteeRepository: Repository<GuaranteeEntity>;
  let vehicleRepository: Repository<VehicleEntity>;
  let productRepository: Repository<ProductEntity>;
  let token: string;
  let ivtDataSource: DataSource;

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

  const mockedPaymentOrderGuarantee: Partial<Guarantee> = {
    id: 1,
    amount: 200,
    invoiceDate: new Date(),
    invoiceNumber: '1',
  };

  const mockedPaymentOrder: DeepPartial<PaymentOrder> = {
    guarantees: [mockedPaymentOrderGuarantee],
  };

  const guaranteeProperties: string[] = ['id', 'aumount', 'invoiceDate', 'invoiceNumber'];

  beforeAll(async () => {
    const testingMoodule: TestingModule = await Test.createTestingModule({
      imports: [
        InnovatechApiDbModule,
        PaymentOrdersModule,
        AuthModule,
        TypeOrmModule.forFeature([VehicleEntity, ProductEntity, PhysicalPersonEntity]),
      ],
    }).compile();
    app = await createNestApp(testingMoodule);
    repository = testingMoodule.get(getRepositoryToken(PaymentOrderEntity));
    vehicleRepository = testingMoodule.get(getRepositoryToken(VehicleEntity));
    productRepository = testingMoodule.get(getRepositoryToken(ProductEntity));
    guaranteeRepository = testingMoodule.get(getRepositoryToken(GuaranteeEntity));
    ivtDataSource = await dataSource.initialize();
    await insertUser(ivtDataSource);
    await insertGroup(ivtDataSource);
    await vehicleRepository.create(mockedVehicle).save();
    await productRepository.create(mockedProduct).save();
    await guaranteeRepository.create(mockedGuarantee).save();

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
    await repository.query(`DELETE FROM "paymentOrders";`);
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
        PaymentOrderEntity,
      ],
      ivtDataSource
    );
    await app.close();
  });

  it('should create an item', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .post('/payment-orders')
      .auth(token, { type: 'bearer' })
      .send(mockedPaymentOrder)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const expected = await repository.findOneBy({ id: body.id });
    const expectedGuarantee = expected.guarantees[0];
    const { guarantees } = body as PaymentOrder;
    const guarantee = guarantees[0];

    expect(pick({ ...guarantee, invoiceDate: dayjs(guarantee.invoiceDate).toString() }, guaranteeProperties)).toEqual(
      pick({ ...expectedGuarantee, invoiceDate: dayjs(expectedGuarantee.invoiceDate).toString() }, guaranteeProperties)
    );
  });
});
