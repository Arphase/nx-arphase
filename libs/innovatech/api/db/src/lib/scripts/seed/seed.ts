import { ConnectionOptions, createConnection } from 'typeorm';

import { config } from '../../config/ormconfig';
import { insertUsers } from './1-users';
import { insertGroups } from './2-groups';
import { insertLocalities } from './3-localities';

export async function seed() {
  console.log('Seed started...');
  const opt = {
    ...config,
    logging: false,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  await insertUsers(connection);
  await insertGroups(connection);
  await insertLocalities();

  console.log('Seed finish!');
}

seed();