import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Prisma } from '@prisma/client';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { TaskMapper } from '../../mappers/task.mapper';

@Injectable()
export class TaskService {
  constructor (
    private taskRepository: TaskRepository,
    private taskMapper: TaskMapper,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  async getAll (userId?: string) {
    const tasks = await this.taskRepository.findMany({
      owner: {
        userId,
      },
    });

    return { tasks: this.taskMapper.getTasksWithCategory(tasks) };
  }

  async getById (id: string) {
    const result = await  this.taskRepository.findById(id) as any;
    return this.taskMapper.getTaskWithCategory(result);
  }

  async create (userId: string, body: CreateTaskDto) {
    const task: Prisma.TaskUncheckedCreateInput = {
      ...body,
      ownerId: (await this.workspaceUserRepository.findWhere({ userId })).id,
    };
    const result = await this.taskRepository.create(task) as any;
    return this.taskMapper.getTaskWithCategory(result);
  }

  async updateById (id: string, body: UpdateTaskDto) {
    const result = await this.taskRepository.updateById(id, body) as any;
    return this.taskMapper.getTaskWithCategory(result);
  }

  async deleteById (id: string) {
    const result = await this.taskRepository.deleteById(id) as any;
    return this.taskMapper.getTaskWithCategory(result);
  }

  async getCreatedByUser (userId: string) {
    const result = await this.taskRepository.findMany({
      owner: {
        userId,
      },
    });
    return { tasks: this.taskMapper.getTasksWithCategory(result) }
  }

  async getAssignedToUser (userId: string) {
    const result = await this.taskRepository.findMany({
      assignedUser: {
        userId,
      },
    });

    return { tasks: this.taskMapper.getTasksWithCategory(result) }
  }
}
