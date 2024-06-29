import { WorkspaceRepository } from '../../database/repositories/workspace.repository';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { WorkspaceUserRoles } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceService {
  constructor (
    private workspaceRepository: WorkspaceRepository,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {}

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
      user: {
        connect: {
          id: userId,
        },
      },
      workspace: {
        connect: {
          id: workspace.id,
        },
      },
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
    const workspaces = await this.getUserWorkspaces(userId) as unknown as any[];
    const result = await Promise.all(workspaces.map(async (workspace) => {
      workspace['role'] = await this.getUserWorkspaceRole(userId, workspace.id);
      return workspace;
    }));

    return { workspaces: result };
  }
}
