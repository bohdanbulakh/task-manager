import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Prisma } from '@prisma/client';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { TaskMapper } from '../../mappers/task.mapper';
import { WorkspaceService } from './workspace.service';

@Injectable()
export class TaskService {
  constructor (
    private taskRepository: TaskRepository,
    private taskMapper: TaskMapper,
    private workspaceUserRepository: WorkspaceUserRepository,
    private workspaceService: WorkspaceService,
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
    const result = await  this.taskRepository.findById(id);
    return this.taskMapper.getTaskWithCategory(result);
  }

  async create (userId: string, body: CreateTaskDto) {
    await this.workspaceService.userHasWorkspace(userId, body.workspaceId);
    await this.workspaceService.userHasWorkspace(body.assignedUserId, body.workspaceId);

    const task: Prisma.TaskUncheckedCreateInput = {
      ...body,
      ownerId: (await this.workspaceUserRepository.findWhere({
        workspaceId: body.workspaceId,
        userId,
      })).id,
      assignedUserId: body.assignedUserId ? (await this.workspaceUserRepository.findWhere({
        workspaceId: body.workspaceId,
        userId: body.assignedUserId,
      })).id : null,
    };
    const result = await this.taskRepository.create(task);
    return this.taskMapper.getTaskWithCategory(result);
  }

  async updateById (id: string, body: UpdateTaskDto) {
    if (body.assignedUserId) {
      await this.workspaceService.userHasWorkspace(body.assignedUserId, body.workspaceId);
    }
    const result = await this.taskRepository.updateById(id, {
      ...body,
      assignedUserId: body.assignedUserId ? (await this.workspaceUserRepository.findWhere({
        workspaceId: body.workspaceId,
        userId: body.assignedUserId,
      })).id : null,
    });
    return this.taskMapper.getTaskWithCategory(result);
  }

  async deleteById (id: string) {
    const result = await this.taskRepository.deleteById(id);
    return this.taskMapper.getTaskWithCategory(result);
  }

  async getCreatedByUser (userId: string) {
    const result = await this.taskRepository.findMany({
      owner: {
        userId,
      },
    });
    return { tasks: this.taskMapper.getTasksWithCategory(result) };
  }

  async getAssignedToUser (userId: string) {
    const result = await this.taskRepository.findMany({
      assignedUser: {
        userId,
      },
    });

    return { tasks: this.taskMapper.getTasksWithCategory(result) };
  }
}
