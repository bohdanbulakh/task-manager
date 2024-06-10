import { Module } from '@nestjs/common';
import { TaskService } from '../api/services/task.service';
import { TaskController } from '../api/controllers/task.controller';
import { TaskByIdPipe } from '../api/pipes/task-by-id.pipe';

@Module({
  providers: [TaskService, TaskByIdPipe],
  controllers: [TaskController],
})
export class TaskModule {}
