import { AuthService, SignUpCredentialsDto } from '@musicr/api/auth';
import { ResetPasswordEntity, UserEntity } from '@musicr/api/domain';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../config/ormconfig.migrations';

async function run() {
  const opt = {
    ...config,
    synchonize: false,
    logging: false,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const authService = new AuthService(
    connection.getRepository(UserEntity),
    connection.getRepository(ResetPasswordEntity),
    null,
    null
  );

  const users: SignUpCredentialsDto[] = [
    {
      firstName: 'Diego',
      lastName: 'Contreras',
      email: 'diego.contreras@mailinator.com',
      password: 'MusicRevolution123@',
    },
  ];

  console.log('Seeding users...');
  users.forEach(async user => {
    try {
      await authService.signUp(user);
      console.log('User added', user.email);
    } catch (error) {
      console.log(error);
    }
  });
  console.log('Seeds done!');
}

run();
