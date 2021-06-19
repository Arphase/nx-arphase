import { ApsCollectionResponse } from '@arphase/common';
import { createCollectionResponse } from '@arphase/api';
import { AuthService } from '@innovatech/api/auth/data';
import { CommonFilterDto, filterCommonQuery } from '@innovatech/api/core/util';
import {
  CompanyRepository,
  GroupRepository,
  ProductRepository,
  ResetPasswordRepository,
  UserRepository,
} from '@innovatech/api/domain';
import { Company, Group, Product, User } from '@innovatech/common/domain';
import { generateId } from '@innovatech/common/utils';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Connection } from 'typeorm';

import { AssignProductsDto } from '../dto/assign-products.dto';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupRepository) private groupRepository: GroupRepository,
    @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ResetPasswordRepository) private resetPasswordRepository: ResetPasswordRepository,
    @InjectRepository(ProductRepository) private productRepository: ProductRepository,
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

  async getGroups(filterDto: Partial<CommonFilterDto>): Promise<ApsCollectionResponse<Group>> {
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
          const newCompany = this.companyRepository.create(omit({ ...company, groupId }, 'users') as Company);
          await queryRunner.manager.save(newCompany);
          const companyId = newCompany.id;

          newCompany.users = await Promise.all(
            users.map(async user => {
              const newUser = this.userRepository.create({ ...user, companyId });
              await queryRunner.manager.save(newUser);
              if (user.id) {
                await newUser.reload();
              }
              if (!newUser.password) {
                await this.resetPasswordRepository.delete({ userId: newUser.id });
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

  async assignProducts(assignProductsDto: AssignProductsDto): Promise<Product[]> {
    const { groupId, productIds } = assignProductsDto;
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) {
      throw new NotFoundException(`Group with id "${groupId} not found`);
    }
    const products = await this.productRepository.findByIds(productIds);
    const databaseProductIds = products.map(product => product.id);
    const missingProducts = productIds.filter(productId => !databaseProductIds.includes(productId));

    if (missingProducts.length) {
      throw new NotFoundException(`Products with id(s) "${missingProducts.toString()} not found`);
    }

    group.products = products;
    group.save();
    return products;
  }
}
