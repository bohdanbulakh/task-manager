import { WorkspaceRepository } from '../../database/repositories/workspace.repository';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { Prisma, WorkspaceUserRoles } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceService {
  constructor (
    private workspaceRepository: WorkspaceRepository,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  async findAll (userId?: string) {
    const workspaces = await this.workspaceRepository.findMany();
    return { workspaces };
  }

  async findUserWorkspaces (userId: string, admin?: boolean) {
    const where: Prisma.WorkspaceWhereInput = {
      workspaceUsers: {
        some: {
          userId,
          role: (admin ? WorkspaceUserRoles.ADMIN : WorkspaceUserRoles.USER),
        },
      },
    };

    return this.workspaceRepository.findMany(where);
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
}
