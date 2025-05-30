import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { AuthService } from '@innovatech/api/auth/data';
import { CommonFilterDto, filterCommonQuery } from '@innovatech/api/core/util';
import { CompanyEntity, GroupEntity, ProductEntity, ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { Company, Group, Product, User } from '@innovatech/common/domain';
import { generateId } from '@innovatech/common/utils';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Connection, Repository } from 'typeorm';

import { AssignProductsDto } from '../dto/assign-products.dto';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>,
    @InjectRepository(CompanyEntity) private companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ResetPasswordEntity) private resetPasswordRepository: Repository<ResetPasswordEntity>,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private connection: Connection,
    private authService: AuthService,
  ) {}

  async getGroups(filterDto: Partial<CommonFilterDto>): Promise<ApsCollectionResponse<Group>> {
    const { pageSize, pageIndex, text } = filterDto;
    const query = this.groupRepository.createQueryBuilder('group');

    if (text) {
      query.andWhere(
        `(LOWER(group.name) like :text OR
         LOWER(group.contact) like :text  OR
         LOWER(group.email) like :text OR
         LOWER(group.phone) like :text)`,
        { text: `%${text.toLowerCase()}%` },
      );
    }

    filterCommonQuery('group', query, filterDto);

    const groups = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(groups, pageSize, pageIndex, total);
  }

  async getGroupById(id: number): Promise<Group> {
    const query = this.groupRepository.createQueryBuilder('group');
    query
      .leftJoinAndSelect('group.companies', 'company')
      .leftJoinAndSelect('company.address', 'address')
      .leftJoinAndSelect('company.users', 'user');

    const found = await query.where('group.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Group with id "${id}" not found`);
    }

    return found;
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
      const companies: Partial<Company>[] = [...groupDto.companies];
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
                await this.authService?.sendSetPasswordEmail(user, resetPasswordEntity);
              }
              return newUser;
            }),
          );
          return newCompany;
        }),
      );

      await queryRunner.commitTransaction();
      return newGroup;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.message });
    } finally {
      await queryRunner.release();
    }
  }

  async assignProducts(assignProductsDto: AssignProductsDto): Promise<Product[]> {
    const { groupId, productIds } = assignProductsDto;
    const group = await this.groupRepository.findOneBy({ id: groupId });
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
    await group.save();
    return products;
  }
}
