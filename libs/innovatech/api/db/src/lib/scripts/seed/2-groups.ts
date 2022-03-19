import { CompanyEntity, GroupEntity, ProductEntity, ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { CreateGroupDto, GroupsService } from '@innovatech/api/groups';
import { Connection } from 'typeorm';

export async function insertGroups(connection: Connection): Promise<void> {
  const groupService = new GroupsService(
    connection.getRepository(GroupEntity),
    connection.getRepository(CompanyEntity),
    connection.getRepository(UserEntity),
    connection.getRepository(ResetPasswordEntity),
    connection.getRepository(ProductEntity),
    connection,
    null
  );

  const groups: CreateGroupDto[] = [
    {
      name: 'Test',
      contact: 'test',
      email: 'test@test.com',
      phone: 'test',
      companies: [
        {
          businessName: 'test',
          rfc: 'MAV951102311',
          contact: 'Test',
          email: 'test@test.com',
          phone: 'test',
          address: {
            zipcode: '64983',
            country: 'México',
            state: 'Nuevo León',
            city: 'Monterrey',
            suburb: 'Colonia',
            street: 'Calle',
            externalNumber: '111',
            internalNumber: '1',
          },
          users: [],
        },
      ],
    },
  ];

  groups.forEach(async user => {
    try {
      await groupService.createGroup(user);
    } catch (error) {
      console.log(error);
    }
  });
}
