import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  constructor (private prisma: PrismaService) {}

  async findMany () {
    return this.prisma.task.findMany();
  }

  async findById (id: string) {
    return this.prisma.task.findFirst({ where: { id } });
  }

  async create (data: Prisma.TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }

  async update (id: string, data: Prisma.TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
