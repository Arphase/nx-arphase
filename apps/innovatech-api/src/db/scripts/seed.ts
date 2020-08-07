import { SignUpCredentialsDto } from '@api/auth/dto/auth-credentials.dto';
import { AuthService } from '@api/auth/services/auth.service';
import { UserRole } from '@ivt/data';
import fs from 'fs';
import path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig';

async function run() {
  const opt = {
    ...config,
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const authService = new AuthService(null, connection);

  const superAdmin: SignUpCredentialsDto = {
    firstName: 'Super',
    lastName: 'Admin',
    secondLastName: 'User',
    email: 'ivtadmin@mailinator.com',
    password: 'Innovatech123@',
    role: UserRole.superAdmin,
  };

  try {
    await authService.signUp(superAdmin);
    console.log('Users seeded!');
  } catch (e) {
    console.log('Users seeded!');
  }

  const queryRunner = connection.createQueryRunner();

  const filePath = path.join(__dirname, 'sepomex-catalog.sql');

  fs.readFile(filePath, 'utf8', async (error, data: string) => {
    if (!error) {
      await queryRunner.query(data);
    } else {
      console.log(error);
    }
  });
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
