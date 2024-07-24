import { WorkspaceRepository } from '../../database/repositories/workspace.repository';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { RoleName } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { EntityAlreadyExistsException } from '../../exceptions/entity-already-exists.exception';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { PermissionGroup, PermissionsService } from './permissions.service';

@Injectable()
export class WorkspaceService {
  constructor (
    private workspaceRepository: WorkspaceRepository,
    private workspaceUserRepository: WorkspaceUserRepository,
    private permissionsService: PermissionsService,
  ) {}

  async findAll () {
    const workspaces = await this.workspaceRepository.findMany();
    return { workspaces };
  }

  async findById (id: string) {
    return this.workspaceRepository.findById(id);
  }

  async create (userId: string, data: CreateWorkspaceDto) {
    const workspace = await this.workspaceRepository.create({
      ...data,
      workspaceUsers: {
        create: {
          userId,
        },
      },
    });

    await this.changeUserRole(userId, workspace.id, { role: RoleName.ADMIN });
    return workspace;
  }

  async updateById (id: string, workspace: UpdateWorkspaceDto) {
    return this.workspaceRepository.updateById(id, workspace);
  }

  async deleteById (id: string) {
    return this.workspaceRepository.deleteById(id);
  }

  async getUserWorkspacesWithRoles (userId: string) {
    const workspaces = await this.workspaceRepository.findMany(
      {
        workspaceUsers: {
          some: { userId },
        },
      },
      {
        workspaceUsers: {
          where: { userId },
          include: { workspaceUserRole: true },
        },
      }
    );

    for (const workspace of workspaces) {
      workspace['role'] = workspace.workspaceUsers[0]['workspaceUserRole']?.role;
      delete workspace.workspaceUsers;
    }

    return { workspaces };
  }

  private async checkWorkspaceUser (userId: string, workspaceId: string) {
    return !!await this.workspaceUserRepository.findWhere({
      userId,
      workspaceId,
    });
  }

  async joinWorkspace (userId: string, workspaceId: string) {
    if (await this.checkWorkspaceUser(userId, workspaceId)) {
      throw new EntityAlreadyExistsException('Workspace', 'user');
    }

    const workspaceUser = await this.workspaceUserRepository.create({
      userId,
      workspaceId,
    },
    {
      workspace: true,
      workspaceUserRole: true,
    });

    await this.changeUserRole(userId, workspaceId, { role: RoleName.USER });
    return {
      ...workspaceUser.workspace,
      role: RoleName.USER,
    };
  }

  async changeUserRole (userId: string, workspaceId: string, { role }: UpdateUserRoleDto) {
    const workspaceUser = await this.workspaceUserRepository.updateUniqueWhere(
      {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      {
        workspaceUserRole: {
          upsert: {
            where: {
              workspaceUser: {
                userId,
                workspaceId,
              },
            },
            create: { role },
            update: { role },
          },
        },
      },
      {
        workspace: true,
        workspaceUserRole: true,
      },
    );

    if (role === RoleName.ADMIN) {
      await this.permissionsService.setPermissionGroup(PermissionGroup.WORKSPACES, { workspaceId }, {
        userId,
        workspaceId,
      });
    } else await this.permissionsService.deletePermissions('workspaces', { userId, workspaceId });

    return {
      ...workspaceUser.workspace,
      role,
    };
  }

  async leaveWorkspace (userId: string, workspaceId: string) {
    const workspaceUser = await this.workspaceUserRepository.deleteUniqueWhere(
      {
        userId,
        workspaceId,
      },
      {
        workspace: true,
        workspaceUserRole: true,
      },
    );

    return {
      ...workspaceUser.workspace,
      role: workspaceUser.workspaceUserRole.role,
    };
  }

  async getTaskWorkspace (taskId: string) {
    return (await this.workspaceRepository.findMany({
      tasks: {
        some: {
          id: taskId,
        },
      },
    }))[0]?.id;
  }

  async getCategoryWorkspace (categoryId: string) {
    return (await this.workspaceRepository.findMany({
      categories: {
        some: {
          id: categoryId,
        },
      },
    }))[0]?.id;
  }
}
