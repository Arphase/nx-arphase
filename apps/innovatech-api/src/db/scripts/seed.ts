import { AuthService, SignUpCredentialsDto } from '@ivt/a-auth';
import { UserRoles } from '@ivt/c-data';
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

  const users: SignUpCredentialsDto[] = [
    {
      firstName: 'Fernando',
      lastName: 'Jimenez',
      secondLastName: 'test',
      email: 'fernando.jimenez@innovatechcorp.com',
      password: 'Innovatech123@',
      role: UserRoles.superAdmin,
    },
    {
      firstName: 'Shari',
      lastName: 'Daniel',
      secondLastName: 'test',
      email: 'shari.daniel@innovatechcorp.com',
      password: 'Innovatech123@',
      role: UserRoles.admin,
    },
  ];

  const queryRunner = connection.createQueryRunner();

  const filePath = path.join(__dirname, 'sepomex-catalog.sql');

  users.forEach(async user => {
    try {
      await authService.signUp(user);
    } catch (error) {
      console.log(error);
    }
  });

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', async (error, data: string) => {
      if (!error) {
        console.log('Inserting localities...');
        await queryRunner.query(data);
        queryRunner.
        console.log('Inserting localities done!');
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
