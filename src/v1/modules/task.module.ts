import { Module } from '@nestjs/common';
import { TaskService } from '../api/services/task.service';
import { TaskController } from '../api/controllers/task.controller';
import { TaskByIdPipe } from '../api/pipes/task-by-id.pipe';
import { WorkspaceModule } from './workspace.module';

@Module({
  imports: [WorkspaceModule],
  controllers: [TaskController],
  providers: [TaskService, TaskByIdPipe],
  exports: [TaskService],
})
export class TaskModule {}
