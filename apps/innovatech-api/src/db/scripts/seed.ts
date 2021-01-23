import { AuthService } from '@ivt/a-auth';
import { SignUpCredentialsDto } from '@ivt/a-state';
import { UserRoles } from '@ivt/c-data';
import fs from 'fs';
import path from 'path';
import { ConnectionOptions, createConnection, getManager } from 'typeorm';

import config from '../config/ormconfig';

async function run() {
  const opt = {
    ...config,
    synchonize: false,
    logging: false,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const authService = new AuthService(null, connection);
  const entityManager = getManager();

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

  const filePath = path.join(__dirname, 'sepomex-catalog.sql');

  users.forEach(async user => {
    try {
      await authService.signUp(user);
    } catch (error) {
      console.log(error);
    }
  });

  console.log('Inserting localities...');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    await entityManager.query(data);
    console.log('Inserting localities done!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

run();
