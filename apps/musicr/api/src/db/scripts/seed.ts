import { AuthService, SignUpCredentialsDto } from '@musicr/api/auth';
import { UserRepository } from '@musicr/api/domain';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig';

async function run() {
  const opt = {
    ...config,
    synchonize: false,
    logging: false,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const authService = new AuthService(connection.getCustomRepository(UserRepository), null);

  const users: SignUpCredentialsDto[] = [
    {
      firstName: 'Diego',
      secondName: '',
      lastName: 'Contreras',
      secondLastName: 'Chapa',
      email: 'diego.contreras@mailinator.com',
      password: 'MusicRevolution123@',
    },
  ];

  console.log('Seeding users...');
  users.forEach(async user => {
    try {
      await authService.signUp(user);
    } catch (error) {
      console.log(error);
    }
  });
  console.log('Seeds done!');
  process.exit(0);
}

run();
