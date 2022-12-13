import { AuthService, SignUpCredentialsDto } from '@valmira/api/auth';
import { ResetPasswordEntity, UserEntity } from '@valmira/api/domain';

import { dataSource } from '../config/ormconfig';

async function run() {
  const connection = await dataSource.initialize();
  const authService = new AuthService(
    connection.getRepository(UserEntity),
    connection.getRepository(ResetPasswordEntity),
    null,
    null
  );

  const users: SignUpCredentialsDto[] = [
    {
      firstName: 'Noe',
      lastName: 'Contreras',
      email: 'noe.contreras@mailinator.com',
      password: 'Valmira123@',
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
