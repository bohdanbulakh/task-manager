import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Prisma } from '@prisma/client';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { CategoryMapper } from '../../mappers/category.mapper';

@Injectable()
export class CategoryService {
  constructor (
    private categoryRepository: CategoryRepository,
    private categoryMapper: CategoryMapper,
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

  async create (userId: string, { workspaceId, ...body }: CreateCategoryDto) {
    const category: Prisma.CategoryUncheckedCreateInput = {
      ...body,
      workspaceId,
      ownerId: (await this.workspaceUserRepository.findWhere({ userId })).id,
    };

    const result = await this.categoryRepository.create(category);
    return this.categoryMapper.getCategory(result);
  }

  async updateById (id: string, body: UpdateCategoryDto) {
    const result = await this.categoryRepository.updateById(id, body);
    return this.categoryMapper.getCategory(result);
  }

  async deleteById (id: string) {
    const result = this.categoryRepository.deleteById(id);
    return this.categoryMapper.getCategory(result);
  }
}
