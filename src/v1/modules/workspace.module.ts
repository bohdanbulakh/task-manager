import { Module } from '@nestjs/common';
import { WorkspaceService } from '../api/services/workspace.service';
import { WorkspaceController } from '../api/controllers/workspace.controller';
import { WorkspaceByIdPipe } from '../api/pipes/workspace-by-id.pipe';

@Module({
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    WorkspaceByIdPipe,
  ],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
