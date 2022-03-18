import { reloadFixtures } from '@arphase/api/testing';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig.migrations';

async function run() {
  const connection = await createConnection(config as ConnectionOptions);
  console.log('Cleaning database...');
  try {
    await reloadFixtures(connection);
    console.log('Database clean!');
  } catch (e) {
    console.error(e);
  }
}

run();
