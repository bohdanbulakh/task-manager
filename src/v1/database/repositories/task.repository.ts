import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateTaskDto } from '../../api/dto/update-task.dto';
import { Repository } from '../../utils/globals';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskRepository implements Repository<Task> {
  constructor (private prisma: PrismaService) {}
  private include = {
    category: true,
    workspace: true,
  };

  async findMany (where?: Prisma.TaskWhereInput) {
    return this.prisma.task.findMany({
      where,
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
    return this.prisma.task.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      include: this.include,
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.task.delete({
      where: { id },
      include: this.include,
    });
  }
}
