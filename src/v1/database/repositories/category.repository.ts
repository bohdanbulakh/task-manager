import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Repository } from '../../utils/globals';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository implements Repository<Category> {
  constructor (private prisma: PrismaService) {}
  private include = {
    workspace: true,
  };

  async findMany (where?: Prisma.CategoryWhereInput) {
    return this.prisma.category.findMany({
      where,
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.category.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.CategoryUncheckedCreateInput) {
    return this.prisma.category.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string) {
    return this.prisma.category.delete({
      where: { id },
      include: this.include,
    });
  }
}
