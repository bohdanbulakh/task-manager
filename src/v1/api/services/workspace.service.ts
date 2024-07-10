import { WorkspaceRepository } from '../../database/repositories/workspace.repository';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { WorkspaceUserRoles } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { EntityAlreadyExistsException } from '../../exceptions/entity-already-exists.exception';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';

@Injectable()
export class WorkspaceService {
  constructor (
    private workspaceRepository: WorkspaceRepository,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async findAll () {
    const workspaces = await this.workspaceRepository.findMany();
    return { workspaces };
  }

  async findById (id: string) {
    return this.workspaceRepository.findById(id);
  }

  async create (userId: string, data: CreateWorkspaceDto) {
    const workspace = await this.workspaceRepository.create(data);
    await this.workspaceUserRepository.create({
      role: WorkspaceUserRoles.ADMIN,
      userId,
      workspaceId: workspace.id,
    });

    return workspace;
  }

  async updateById (id: string, workspace: UpdateWorkspaceDto) {
    return this.workspaceRepository.updateById(id, workspace);
  }

  async deleteById (id: string) {
    return this.workspaceRepository.deleteById(id);
  }

  private async getUserWorkspaces (userId: string) {
    return this.workspaceRepository.findMany(
      {
        workspaceUsers: {
          some: { userId },
        },
      },
    );
  }

  private async getUserWorkspaceRole (userId: string, workspaceId: string) {
    const workspaceUser = await this.workspaceUserRepository.findWhere({
      userId,
      workspaceId,
    });
    return workspaceUser.role;
  }

  async getUserWorkspacesWithRoles (userId: string) {
    const workspaces = await this.getUserWorkspaces(userId);
    const result = await Promise.all(workspaces.map(async (workspace) => {
      workspace['role'] = await this.getUserWorkspaceRole(userId, workspace.id);
      return workspace;
    }));

    return { workspaces: result };
  }

  private async checkWorkspaceUser (userId: string, workspaceId: string) {
    return !!await this.workspaceUserRepository.findWhere({
      userId,
      workspaceId,
    });
  }

  async userHasWorkspace (userId: string, workspaceId: string) {
    if (!workspaceId && userId || !await this.checkWorkspaceUser(userId, workspaceId)) {
      throw new InvalidEntityPropertyException('Workspace', 'user');
    }
  }

  async joinWorkspace (userId: string, workspaceId: string) {
    if (await this.checkWorkspaceUser(userId, workspaceId)) {
      throw new EntityAlreadyExistsException('Workspace', 'user');
    }

    const workspaceUser = await this.workspaceUserRepository.create({
      userId,
      workspaceId,
      role: WorkspaceUserRoles.USER,
    }, { workspace: true });

    return {
      ...workspaceUser.workspace,
      role: workspaceUser.role,
    };
  }

  async changeUserRole (userId: string, workspaceId: string, data: UpdateUserRoleDto) {
    await this.userHasWorkspace(userId, workspaceId);

    const workspaceUser = await this.workspaceUserRepository.updateUniqueWhere(
      {
        userId,
        workspaceId,
      },
      data,
      { workspace: true },
    );

    return {
      ...workspaceUser.workspace,
      role: workspaceUser.role,
    };
  }

  async leaveWorkspace (userId: string, workspaceId: string) {
    await this.userHasWorkspace(userId, workspaceId);

    const workspaceUser = await this.workspaceUserRepository.deleteUniqueWhere(
      {
        userId,
        workspaceId,
      },
      { workspace: true },
    );

    return {
      ...workspaceUser.workspace,
      role: workspaceUser.role,
    };
  }
}
