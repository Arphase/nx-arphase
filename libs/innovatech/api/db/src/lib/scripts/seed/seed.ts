import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../../config/ormconfig';
import { insertUser } from './1-users';
import { insertGroup } from './2-groups';
import { insertLocalities } from './3-localities';

export async function seed() {
  console.log('Seed started...');

  const connection = await createConnection(config as ConnectionOptions);
  await insertUser(connection);
  await insertGroup(connection);
  await insertLocalities();

  console.log('Seed finish!');
}

seed();
