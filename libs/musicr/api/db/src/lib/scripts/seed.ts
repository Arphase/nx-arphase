import { dataSource } from '../config/ormconfig';
import { insertUser } from './1-users';

async function run() {
  const connection = await dataSource.initialize();
  await insertUser(connection);
}

run();
