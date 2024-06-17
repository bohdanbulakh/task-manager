import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from '../../api/dto/create-task.dto';
import { UpdateTaskDto } from '../../api/dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor (private prisma: PrismaService) {}
  private include = {
    category: true,
  };

  async findMany (userId?: string) {
    return this.prisma.task.findMany({
      include: this.include,
      where: { userId },
    });
  }

  async findById (id: string) {
    return this.prisma.task.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (userId: string, data: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...data,
        userId,
      },
      include: this.include,
    });
  }

  async update (id: string, data: UpdateTaskDto) {
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
