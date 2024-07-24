import { Module } from '@nestjs/common';
import { UserController } from '../api/controllers/user.controller';
import { CategoryModule } from './category.module';
import { WorkspaceModule } from './workspace.module';
import { TaskModule } from './task.module';

@Module({
  imports: [
    TaskModule,
    CategoryModule,
    WorkspaceModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
