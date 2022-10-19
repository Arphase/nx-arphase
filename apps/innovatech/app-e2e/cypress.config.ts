import { dropFixtures } from '@arphase/api/db';
import { dataSource, insertGroup, insertLocalities, insertUser } from '@innovatech/api/db';
import { GroupEntity, ProductEntity, VehicleEntity } from '@innovatech/api/domain';
import { Product, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { DataSource } from 'typeorm';

let connection: DataSource;

export default defineConfig({
  projectId: 'beh4qc',
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on, config) {
      on('task', {
        async connectToDb() {
          connection = await dataSource.initialize();
          await connection.synchronize();
          return null;
        },
        async seed() {
          await insertUser(connection);
          await insertGroup(connection);
          return null;
        },
        async seedLocalities() {
          await insertLocalities(connection, { light: true });
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
          const group = await repository.findOneBy({ id: 1 });
          group.products = products;
          await group.save();
          return null;
        },
        async clean() {
          await dropFixtures(connection);
          return null;
        },
        async closeDbConnection() {
          await connection.destroy();
          return null;
        },
      });
    },
  },
});
