import { dataSource } from '../../config';
import { insertUser } from './1-users';
import { insertGroup } from './2-groups';
import { insertLocalities } from './3-localities';

export async function seed() {
  console.log('Seed started...');

  const connection = await dataSource.initialize();
  await insertUser(connection);
  await insertGroup(connection);
  await insertLocalities(connection);

  console.log('Seed finish!');
}

seed();
