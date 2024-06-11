import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor (private prisma: PrismaService) {}
  private include = {
    tasks: true,
  };

  async findMany () {
    return this.prisma.category.findMany({
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
    return this.prisma.category.create({ data });
  }

  async update (id: string, data: Prisma.CategoryUncheckedUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
