import { AuthService } from '@ivt/a-auth';
import {
  CommonFilterDto,
  CompanyEntity,
  CompanyRepository,
  CreateGroupDto,
  filterCommonQuery,
  GroupRepository,
  ResetPasswordRepository,
  UpdateGroupDto,
  UserEntity,
  UserRepository,
} from '@ivt/a-state';
import { Company, createCollectionResponse, Group, IvtCollectionResponse, User } from '@ivt/c-data';
import { generateId } from '@ivt/c-utils';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Connection } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ResetPasswordRepository) private resetPasswordRepository: ResetPasswordRepository,
    private connection: Connection,
    private authService: AuthService
  ) {}

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

  async getGroups(filterDto: Partial<CommonFilterDto>): Promise<IvtCollectionResponse<Group>> {
    const { pageSize, pageIndex, text } = filterDto;
    const query = this.groupRepository.createQueryBuilder('group');

    if (text) {
      query.andWhere(
        `LOWER(group.name) like :name OR
         LOWER(group.contact) like :name  OR
         LOWER(group.email) like :name OR
         LOWER(group.phone) like :name`,
        { name: `%${text.toLowerCase()}%` }
      );
    }

    filterCommonQuery('group', query, filterDto);

    const groups = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(groups, pageSize, pageIndex, total);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.saveGroup(createGroupDto);
  }

  async updateGroup(updateGroupDto: UpdateGroupDto): Promise<Group> {
    return await this.saveGroup(updateGroupDto);
  }

  async saveGroup(groupDto: CreateGroupDto | UpdateGroupDto): Promise<Group> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const companies: Company[] = [...groupDto.companies];
      const group = omit(groupDto, 'companies') as CreateGroupDto | UpdateGroupDto;
      const newGroup = this.groupRepository.create(group);
      await queryRunner.manager.save(newGroup);
      const groupId = newGroup.id;

      newGroup.companies = await Promise.all(
        companies.map(async company => {
          const users: User[] = [...company.users];
          const newCompany = this.companyRepository.create(omit({ ...company, groupId }, 'users') as CompanyEntity);
          await queryRunner.manager.save(newCompany);
          const companyId = newCompany.id;

          newCompany.users = await Promise.all(
            users.map(async user => {
              const newUser = this.userRepository.create({ ...user, companyId } as UserEntity);
              await queryRunner.manager.save(newUser);
              if (user.id) {
                await newUser.reload();
              }
              if (!newUser.password) {
                const resetPasswordEntity = this.resetPasswordRepository.create({
                  userId: newUser.id,
                  passwordToken: generateId(),
                  timestamp: new Date(),
                });
                await queryRunner.manager.save(resetPasswordEntity);
                await this.authService.sendSetPasswordEmail(user, resetPasswordEntity);
              }
              return newUser;
            })
          );
          return newCompany;
        })
      );

      await queryRunner.commitTransaction();
      return newGroup;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }
}
