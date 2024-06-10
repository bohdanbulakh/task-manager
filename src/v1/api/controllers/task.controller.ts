import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskByIdPipe } from '../pipes/task-by-id.pipe';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor (private readonly taskService: TaskService) {}

  @Get()
  getAll () {
    return this.taskService.getAll();
  }

  @Get(':taskId')
  get (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.get(taskId);
  }

  @Post()
  create (@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch(':taskId')
  updateById (
    @Param('taskId', TaskByIdPipe) taskId: string,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, body);
  }

  @Delete(':taskId')
  deleteById (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.deleteById(taskId);
  }
}
