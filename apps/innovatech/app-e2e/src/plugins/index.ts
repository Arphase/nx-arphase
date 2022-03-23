// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import { dropFixtures } from '@arphase/api/db';
import { insertGroup, insertLocalities, insertUser, ormConfig } from '@innovatech/api/db';
import { GroupEntity, ProductEntity, VehicleEntity } from '@innovatech/api/domain';
import { Product, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { Connection, ConnectionOptions, createConnection, getManager } from 'typeorm';

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
let connection: Connection;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config));

  on('task', {
    async connectToDb() {
      await createConnection(ormConfig as ConnectionOptions);
      connection = getManager().connection;
      connection.synchronize();
      return null;
    },
    async seed() {
      await insertUser(connection);
      await insertGroup(connection);
      return null;
    },
    async seedLocalities() {
      await insertLocalities({ light: true });
      return null;
    },
    async seedVehicle() {
      const mockedVehicle: Partial<Vehicle> = {
        brand: 'Seat',
        model: 'Ibiza',
        version: 'Style',
        year: 2020,
        vin: '37289472398473289',
        motorNumber: '37289472398473289',
        horsePower: 100,
        companyId: 1,
        status: VehicleStatus.elegible,
      };
      const repository = connection.getRepository(VehicleEntity);
      await repository.create(mockedVehicle).save();
      return null;
    },
    async seedProduct() {
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
      const repository = connection.getRepository(ProductEntity);
      await repository.create(mockedProduct).save();
      return null;
    },
    async seedAssignedProduct() {
      const repository = connection.getRepository(GroupEntity);
      const productRepository = connection.getRepository(ProductEntity);
      const products = await productRepository.find();
      const group = await repository.findOne({ id: 1 });
      group.products = products;
      await group.save();
      return null;
    },
    async clean() {
      await dropFixtures(connection);
      return null;
    },
    async closeDbConnection() {
      await connection.close();
      return null;
    },
  });
};
