import { AuthService } from '@ivt/a-auth';
import { CompanyRepository, GroupRepository, UserEntity, UserRepository } from '@ivt/a-state';
import { Company, Group, User } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { flatten, omit } from 'lodash';
import { Connection } from 'typeorm';

import { CreateGroupDto } from '../dto/create-group.dto';
import { GetGroupsFilterDto } from '../dto/get-groups-filter.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupsService {
  groupRepository: GroupRepository;
  companyRepository: CompanyRepository;
  userRepository: UserRepository;

  constructor(private readonly connection: Connection, private authService: AuthService) {
    this.groupRepository = this.connection.getCustomRepository(GroupRepository);
    this.companyRepository = this.connection.getCustomRepository(CompanyRepository);
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async getGroupById(id: number): Promise<Group> {
    const query = this.groupRepository.createQueryBuilder('group');
    query
      .leftJoinAndSelect('group.companies', 'company')
      .leftJoinAndSelect('company.address', 'adress')
      .leftJoinAndSelect('company.users', 'user');

    const found = await query.where('group.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Group with id "${id}" not found`);
    }

    return found;
  }

  async getGroups(filterDto: Partial<GetGroupsFilterDto>): Promise<Group[]> {
    const { limit, offset, sort, direction, text } = filterDto;
    const query = this.groupRepository.createQueryBuilder('group');

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    if (text) {
      query.andWhere(
        `LOWER(group.name) like :name OR
         LOWER(group.contact) like :name  OR
         LOWER(group.email) like :name OR
         LOWER(group.phone) like :name`,
        { name: `%${text.toLowerCase()}%` }
      );
    }

    query.groupBy('group.id').take(limit).skip(offset);

    const groups = await query.getMany();
    return groups;
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const companies: Company[] = [...createGroupDto.companies];
      const group = omit(createGroupDto, 'companies');
      const newGroup = await this.groupRepository.create(group);
      await newGroup.save();
      const groupId = newGroup.id;

      await companies.forEach(async company => {
        const users: User[] = [...company.users];
        const newCompany = await this.companyRepository.create(omit({ ...company, groupId }, 'users'));
        await newCompany.save();
        const companyId = newCompany.id;

        await users.forEach(async user => {
          const newUser = await this.userRepository.create({ ...user, companyId } as UserEntity);
          await newUser.save();
          await this.authService.sendSetPasswordEmail(newUser.id);
        });
      });

      await queryRunner.commitTransaction();
      return newGroup;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateGroup(updateGroupDto: UpdateGroupDto): Promise<Group> {
    const updatedGroup = await this.groupRepository.save(updateGroupDto);
    const userIds: number[] = flatten(updatedGroup.companies.map(company => company.users.map(user => user.id)));
    this.authService.sendEmailToPendingUsers(userIds);
    return updatedGroup;
  }
}
