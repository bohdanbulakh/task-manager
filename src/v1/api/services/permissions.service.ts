import { WorkspaceUserRolesRepository } from '../../database/repositories/workspace-user-roles.repository';
import { PermissionUtils } from '../../utils/permission.utils';
import { Permissions } from '../../security/permissions';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';
import { PrismaService } from '../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RoleName } from '@prisma/client';

export enum PermissionGroup {
  WORKSPACES = 'workspaces',
  CATEGORIES = 'categories',
  TASKS = 'tasks',
}

@Injectable()
export class PermissionsService {
  constructor (
    private workspaceUserRolesRepository: WorkspaceUserRolesRepository,
    private workspaceUserRepository: WorkspaceUserRepository,
    private prisma: PrismaService,
  ) {}

  async setPermissionGroup (permissionGroup: PermissionGroup, values: object, ids: {
    userId: string;
    workspaceId: string
  }) {
    await this.setPermission(Object.values(Permissions).filter((permission) => permission.startsWith(permissionGroup)), values, ids);
  }

  async setPermission (permissions: string[], values: object, ids: { userId: string; workspaceId: string }) {
    const resultPermissions = permissions.map((permission) => ({ action: PermissionUtils.makePermission(permission, values) }));
    const workspaceUser = await this.workspaceUserRepository.findWhere({ ...ids,
      workspaceUserRole: {
        permissions: {
          none: {
            action: {
              in: resultPermissions.map((pr) => pr.action),
            },
          },
        },
      },
    });
    if (workspaceUser) {
      return this.workspaceUserRolesRepository.updateById(workspaceUser.id, {
        permissions: {
          createMany: {
            data: resultPermissions,
          },
        },
      });
    }
  }

  async checkPermission (
    userId: string,
    permission: string
  ) {
    const roles = await this.workspaceUserRolesRepository.find({
      workspaceUser: {
        userId: userId,
      },
      permissions: {
        some: {
          action: permission,
        },
      },
    });
    return !!roles;
  }

  async deletePermissions (contains: string, ids?: {userId: string, workspaceId: string}) {
    return this.prisma.permission.deleteMany({
      where: {
        workspaceUserRole: {
          workspaceUser: ids ? {
            userId: ids.userId,
            workspaceId: ids.workspaceId,
          } : {},
          NOT: ids ? {
            role: RoleName.ADMIN,
          } : {},
        },
        action: {
          contains,
        },
      },
    });
  }
}
