import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  constructor (private prisma: PrismaService) {}
  private include = {
    category: true,
  };

  async findMany () {
    return this.prisma.task.findMany({
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.task.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }

  async update (id: string, data: Prisma.TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      include: this.include,
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.task.delete({
      where: { id },
      include: this.include,
    });
  }
}
