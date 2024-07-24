import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Prisma, RoleName } from '@prisma/client';
import { CategoryMapper } from '../../mappers/category.mapper';
import { PermissionGroup, PermissionsService } from './permissions.service';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';

@Injectable()
export class CategoryService {
  constructor (
    private categoryRepository: CategoryRepository,
    private categoryMapper: CategoryMapper,
    private permissionsService: PermissionsService,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  async getAll (userId?: string) {
    const categories = await this.categoryRepository.findMany({ ownerId: userId });

    return {
      categories: this.categoryMapper.getCategories(categories),
    };
  }

  async getById (id: string) {
    const category = await this.categoryRepository.findById(id);
    return this.categoryMapper.getCategory(category);
  }

  async create (ownerId: string, { workspaceId, ...body }: CreateCategoryDto) {
    const category: Prisma.CategoryCreateInput = {
      ...body,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
      owner: {
        connect: {
          userId_workspaceId: {
            userId: ownerId,
            workspaceId,
          },
        },
      },
    };

    const result = await this.categoryRepository.create(category);
    const { userId: workspaceAdminId } = (await this.workspaceUserRepository.findWhere({
      workspaceId,
      workspaceUserRole: {
        role: RoleName.ADMIN,
      },
    }));

    for (const userId of [ownerId, workspaceAdminId]) {
      if (userId) {
        await this.permissionsService.setPermissionGroup(
          PermissionGroup.CATEGORIES,
          { categoryId: result.id },
          {
            userId,
            workspaceId,
          }
        );
      }
    }
    return this.categoryMapper.getCategory(result);
  }

  async updateById (id: string, body: UpdateCategoryDto) {
    const result = await this.categoryRepository.updateById(id, body);
    return this.categoryMapper.getCategory(result);
  }

  async deleteById (id: string) {
    const result = await this.categoryRepository.deleteById(id);
    await this.permissionsService.deletePermissions(result.id);
    return this.categoryMapper.getCategory(result);
  }

  async getUserCategories (ownerId: string) {
    const result = await this.categoryRepository.findMany(
      {
        owner: {
          userId: ownerId,
        },
      },
    );

    return { categories: this.categoryMapper.getCategories(result) };
  }
}
