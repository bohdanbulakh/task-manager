import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskService } from '../api/services/task.service';
import { TaskController } from '../api/controllers/task.controller';
import { PermissionsModule } from './permissions.module';
import { WorkspaceModule } from './workspace.module';
import { WorkspaceIdMiddleware } from '../api/middleware/workspace-id-middleware.service';

@Module({
  imports: [
    PermissionsModule,
    WorkspaceModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(WorkspaceIdMiddleware)
      .forRoutes(TaskController);
  }
}
