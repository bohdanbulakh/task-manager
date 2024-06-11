import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskByIdPipe } from '../pipes/task-by-id.pipe';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TaskWithCategoryResponse } from '../responses/task-with-category.response';
import { TasksWithCategoryResponse } from '../responses/tasks-with-category.response';

@ApiTags('Tasks')
@Controller({
  version: '1',
  path: 'tasks',
})
export class TaskController {
  constructor (private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ type: TasksWithCategoryResponse })
  @Get()
  getAll () {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({
    name: 'taskId',
    description: 'Id of the task',
  })
  @ApiOkResponse({ type: TaskWithCategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      Task with such id not found`,
  })
  @Get(':taskId')
  getById (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.getById(taskId);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiOkResponse({ type: TaskWithCategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException: 
      Name cannot be empty
      Name must be a string
      Name length must be between 1 and 20
      Description cannot be empty
      Description must be a string
      Status must be an enum
      Priority cannot be empty
      Priority must be an enum
      Deadline must be a date
      CategoryId must be an UUID
      Category with such id not found
      
      InvalidEntityIdException:
        Category with such id not found`,
  })
  @Post()
  create (@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiParam({
    name: 'taskId',
    description: 'Id of the task',
  })
  @ApiOkResponse({ type: TaskWithCategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException: 
      Name must be a string
      Name length must be between 1 and 20
      Description must be a string
      Status must be an enum
      Priority must be an enum
      Deadline must be a date
      CategoryId must be an UUID
      Category with such id not found
      
      InvalidEntityIdException:
        Category with such id not found`,
  })
  @Patch(':taskId')
  updateById (
    @Param('taskId', TaskByIdPipe) taskId: string,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.updateById(taskId, body);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiParam({
    name: 'taskId',
    description: 'Id of the task',
  })
  @ApiOkResponse({ type: TaskWithCategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      Task with such id not found`,
  })
  @Delete(':taskId')
  deleteById (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.deleteById(taskId);
  }
}
