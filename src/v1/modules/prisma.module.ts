import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskRepository } from '../database/repositories/task.repository';
import { CategoryRepository } from '../database/repositories/category.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { WorkspaceRepository } from '../database/repositories/workspace.repository';
import { WorkspaceUserRepository } from '../database/repositories/workspace-user.repository';
import { WorkspaceUserRolesRepository } from '../database/repositories/workspace-user-roles.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    TaskRepository,
    CategoryRepository,
    UserRepository,
    WorkspaceRepository,
    WorkspaceUserRepository,
    WorkspaceUserRolesRepository,
  ],
  exports: [
    PrismaService,
    TaskRepository,
    CategoryRepository,
    UserRepository,
    WorkspaceRepository,
    WorkspaceUserRepository,
    WorkspaceUserRolesRepository,
  ],
})
export class PrismaModule {}
