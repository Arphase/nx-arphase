import { AuthService, SignUpCredentialsDto } from '@ivt/a-auth';
import { UserRole } from '@ivt/c-data';
import fs from 'fs';
import path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig';

async function run() {
  const opt = {
    ...config,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const authService = new AuthService(null, connection);

  const superAdmin: SignUpCredentialsDto = {
    firstName: 'Super',
    lastName: 'Admin',
    secondLastName: 'User',
    email: 'fernando.jimenez@innovatechcorp.com',
    password: 'Innovatech123@',
    role: UserRole.superAdmin,
  };

  const queryRunner = connection.createQueryRunner();

  const filePath = path.join(__dirname, 'sepomex-catalog.sql');

  try {
    await authService.signUp(superAdmin);
  } catch (e) {}

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', async (error, data: string) => {
      if (!error) {
        await queryRunner.query(data);
        resolve();
      } else {
        console.log(error);
        reject();
      }
    });
  });
}

run()
  .then(_ => {
    console.log('Seeds done');
    process.exit(0);
  })
  .catch(error => console.error('seed error', error));
