import { Global, Module } from '@nestjs/common';
import { WorkspaceByIdPipe } from '../api/pipes/workspace-by-id.pipe';
import { WorkspaceWithUserPipe } from '../api/pipes/workspace-with-user.pipe';
import { CategoryByIdPipe } from '../api/pipes/category-by-id.pipe';
import { TaskByIdPipe } from '../api/pipes/task-by-id.pipe';
import { UserByIdPipe } from '../api/pipes/user-by-id.pipe';
import { UniqueUsernamePipe } from '../api/pipes/unique-username.pipe';

@Global()
@Module({
  providers: [
    WorkspaceByIdPipe,
    WorkspaceWithUserPipe,
    CategoryByIdPipe,
    TaskByIdPipe,
    UserByIdPipe,
    UniqueUsernamePipe,
  ],
  exports: [
    WorkspaceByIdPipe,
    WorkspaceWithUserPipe,
    CategoryByIdPipe,
    TaskByIdPipe,
    UserByIdPipe,
    UniqueUsernamePipe,
  ],
})
export class PipesModule {}
