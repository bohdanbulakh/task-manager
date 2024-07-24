import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Repository } from '../../utils/globals';
import { Category, Prisma } from '@prisma/client';
import { CategoryMapper } from '../../mappers/category.mapper';

@Injectable()
export class CategoryRepository implements Repository<Category> {
  constructor (
    private prisma: PrismaService,
    private categoryMapper: CategoryMapper,
  ) {}
  private include: Prisma.CategoryInclude = {
    workspace: true,
    owner: true,
  };

  async findMany (where?: Prisma.CategoryWhereInput) {
    const result= await this.prisma.category.findMany({
      where,
      include: this.include,
    });
    return this.categoryMapper.getCategoriesUserIds(result);
  }

  async findById (id: string) {
    const result = await this.prisma.category.findFirst({
      where: { id },
      include: this.include,
    });
    return this.categoryMapper.getCategoryUserIds(result);
  }

  async create (data: Prisma.CategoryUncheckedCreateInput | Prisma.CategoryCreateInput) {
    const result = await this.prisma.category.create({
      data,
      include: this.include,
    });
    return this.categoryMapper.getCategoryUserIds(result);
  }

  async updateById (id: string, data: Prisma.CategoryUpdateInput) {
    const result = await this.prisma.category.update({
      where: { id },
      data,
      include: this.include,
    });
    return this.categoryMapper.getCategoryUserIds(result);
  }

  async deleteById (id: string) {
    const result = await this.prisma.category.delete({
      where: { id },
      include: this.include,
    });
    return this.categoryMapper.getCategoryUserIds(result);
  }
}
