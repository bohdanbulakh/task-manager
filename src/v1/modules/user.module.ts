import { Module } from '@nestjs/common';
import { UserController } from '../api/controllers/user.controller';
import { UserByIdPipe } from '../api/pipes/user-by-id.pipe';
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
  providers: [UserByIdPipe],
})
export class UserModule {}
