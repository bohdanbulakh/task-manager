import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Repository } from '../../utils/globals';
import { Prisma, Task } from '@prisma/client';
import { TaskMapper } from '../../mappers/task.mapper';

@Injectable()
export class TaskRepository implements Repository<Task> {
  constructor (
    private prisma: PrismaService,
    private taskMapper: TaskMapper,
  ) {}
  private include: Prisma.TaskInclude = {
    category: true,
    workspace: true,
    owner: true,
    assignedUser: true,
  };

  async findMany (where?: Prisma.TaskWhereInput) {
    const result = await this.prisma.task.findMany({
      where,
      include: this.include,
    });
    return this.taskMapper.getTasksUserIds(result);
  }

  async find (where?: Prisma.TaskWhereInput) {
    const result = await this.prisma.task.findFirst({
      where,
      include: this.include,
    });
    return this.taskMapper.getTaskUserIds(result);
  }

  async findById (id: string) {
    const result = await this.prisma.task.findFirst({
      where: { id },
      include: this.include,
    });
    return this.taskMapper.getTaskUserIds(result);
  }

  async create (data: Prisma.TaskUncheckedCreateInput | Prisma.TaskCreateInput) {
    const result = await this.prisma.task.create({
      data,
      include: this.include,
    });
    return this.taskMapper.getTaskUserIds(result);
  }

  async updateById (id: string, data: Prisma.TaskUncheckedUpdateInput | Prisma.TaskUpdateInput) {
    const result = await this.prisma.task.update({
      where: { id },
      include: this.include,
      data,
    });
    return this.taskMapper.getTaskUserIds(result);
  }

  async deleteById (id: string) {
    const result = await this.prisma.task.delete({
      where: { id },
      include: this.include,
    });
    return this.taskMapper.getTaskUserIds(result);
  }
}
