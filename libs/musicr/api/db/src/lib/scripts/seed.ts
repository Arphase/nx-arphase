import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig';
import { insertUser } from './1-users';

async function run() {
  const connection = await createConnection(config as ConnectionOptions);
  await insertUser(connection);
}

run();
