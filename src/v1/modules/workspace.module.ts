import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WorkspaceService } from '../api/services/workspace.service';
import { WorkspaceController } from '../api/controllers/workspace.controller';
import { PermissionsModule } from './permissions.module';
import { PermissionsService } from '../api/services/permissions.service';
import { WorkspaceIdMiddleware } from '../api/middleware/workspace-id-middleware.service';

@Module({
  imports: [PermissionsModule],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    PermissionsService,
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(WorkspaceIdMiddleware)
      .forRoutes(WorkspaceController);
  }
}
