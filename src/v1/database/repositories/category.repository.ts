import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from '../../api/dto/create-category.dto';
import { UpdateCategoryDto } from '../../api/dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor (private prisma: PrismaService) {}
  private include = {
    tasks: true,
  };

  async findMany (userId?: string) {
    return this.prisma.category.findMany({
      where: { userId },
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.category.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (userId: string, data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update (id: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
