import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Prisma, RoleName } from '@prisma/client';
import { TaskMapper } from '../../mappers/task.mapper';
import { PermissionGroup, PermissionsService } from './permissions.service';
import { Permissions } from '../../security/permissions';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { WorkspaceService } from './workspace.service';

@Injectable()
export class TaskService {
  constructor (
    private taskRepository: TaskRepository,
    private taskMapper: TaskMapper,
    private permissionsService: PermissionsService,
    private workspaceService: WorkspaceService,
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
    const result = await  this.taskRepository.findById(id);
    return this.taskMapper.getTaskWithCategory(result);
  }

  async create (ownerId: string, { workspaceId, assignedUserId = undefined, categoryId = undefined, ...body }: CreateTaskDto) {
    const task: Prisma.TaskCreateInput = {
      ...body,
      owner: {
        connect: {
          userId_workspaceId: {
            workspaceId,
            userId: ownerId,
          },
        },
      },
      category: categoryId ? {
        connect: {
          id: categoryId,
        },
      }: {},
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    };
    console.log(task);
    const { id } = await this.taskRepository.create(task);
    const result = await this.updateById(id, { assignedUserId });

    const { userId: workspaceAdminId } = (await this.workspaceUserRepository.findWhere({
      workspaceId,
      workspaceUserRole: {
        role: RoleName.ADMIN,
      },
    }));

    for (const userId of [ownerId, workspaceAdminId]) {
      if (userId) {
        await this.permissionsService.setPermissionGroup(
          PermissionGroup.TASKS,
          { taskId: id }, {
            userId,
            workspaceId,
          });
      }
    }

    if (assignedUserId) {
      await this.permissionsService.setPermission(
        [Permissions.TASKS_$TASKID_UPDATE],
        { taskId: id }, {
          userId: ownerId,
          workspaceId,
        }
      );
    }
    return this.taskMapper.getTaskWithCategory(result);
  }

  async updateById (id: string, { assignedUserId: userId, ...body }: UpdateTaskDto) {
    const taskWorkspaceId = await this.workspaceService.getTaskWorkspace(id);
    const result = await this.taskRepository.updateById(id, {
      ...body,
    });

    await this.taskRepository.updateById(id, {
      assignedUser: userId ? {
        connect: {
          userId_workspaceId: {
            userId,
            workspaceId: taskWorkspaceId,
          },
        },
      } : {},
    });

    if (userId) {
      await this.permissionsService.deletePermissions(
        result.id, {
          userId: result.assignedUserId,
          workspaceId: taskWorkspaceId,
        });
      await this.permissionsService.setPermission(
        [Permissions.TASKS_$TASKID_UPDATE],
        { taskId: result.id }, {
          userId,
          workspaceId: taskWorkspaceId,
        });
    }
    return this.taskMapper.getTaskWithCategory(result);
  }

  async deleteById (id: string) {
    const result = await this.taskRepository.deleteById(id);
    await this.permissionsService.deletePermissions(result.id);
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
