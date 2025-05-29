import { AuthService, SignUpCredentialsDto } from '@innovatech/api/auth/data';
import { ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { UserRoles } from '@innovatech/common/domain';
import { Connection } from 'typeorm';

export async function insertUser(
  connection: Connection,
  user: SignUpCredentialsDto = {
    firstName: 'Víctor',
    lastName: 'Martínez',
    secondLastName: 'Valdés',
    email: 'victor.martinez@mailinator.com',
    password: 'Innovatech123@',
    role: UserRoles.superAdmin,
  },
): Promise<void> {
  const authService = new AuthService(
    connection.getRepository(UserEntity),
    connection.getRepository(ResetPasswordEntity),
    null,
    null,
  );
  await authService.signUp(user);
}
