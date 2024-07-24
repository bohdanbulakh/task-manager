import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryController } from '../api/controllers/category.controller';
import { CategoryService } from '../api/services/category.service';
import { PermissionsModule } from './permissions.module';
import { WorkspaceIdMiddleware } from '../api/middleware/workspace-id-middleware.service';
import { WorkspaceModule } from './workspace.module';

@Module({
  imports: [
    PermissionsModule,
    WorkspaceModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(WorkspaceIdMiddleware)
      .forRoutes(CategoryController);
  }
}
