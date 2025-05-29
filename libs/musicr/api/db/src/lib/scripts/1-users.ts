import { AuthService, SignUpCredentialsDto } from '@musicr/api/auth';
import { ResetPasswordEntity, UserEntity } from '@musicr/api/domain';
import { Connection } from 'typeorm';

export async function insertUser(
  connection: Connection,
  user: SignUpCredentialsDto = {
    firstName: 'Víctor',
    lastName: 'Martínez',
    email: 'victor.martinez@mailinator.com',
    password: 'MusicRevolution123@',
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
