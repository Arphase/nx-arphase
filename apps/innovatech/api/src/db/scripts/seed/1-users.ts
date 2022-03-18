import { AuthService, SignUpCredentialsDto } from '@innovatech/api/auth/data';
import { ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { UserRoles } from '@innovatech/common/domain';
import { Connection } from 'typeorm';

export async function insertUsers(connection: Connection): Promise<void> {
  const authService = new AuthService(
    connection.getRepository(UserEntity),
    connection.getRepository(ResetPasswordEntity),
    null,
    null
  );
  const users: SignUpCredentialsDto[] = [
    {
      firstName: 'Víctor',
      lastName: 'Martínez',
      secondLastName: 'Valdés',
      email: 'victor.martinez@mailinator.com',
      password: 'Innovatech123@',
      role: UserRoles.superAdmin,
    },
  ];

  users.forEach(async user => {
    try {
      await authService.signUp(user);
    } catch (error) {
      console.log(error);
    }
  });
}
