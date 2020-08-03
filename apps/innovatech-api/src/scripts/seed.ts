import { createConnection, ConnectionOptions } from 'typeorm';
import { UserRole } from '@ivt/data';
import { AuthService } from '@api/auth/services/auth.service';
import { SignUpCredentialsDto } from '@api/auth/dto/auth-credentials.dto';
import { typeOrmConfig } from '../config/typeorm.config';

async function run() {
  const opt = {
    ...typeOrmConfig,
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
  const work = authService
    .signUp(superAdmin)
    .then((r) => (console.log('done ->', r.email), r));

  return await work;
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
