import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskByIdPipe } from '../pipes/task-by-id.pipe';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { TaskExtendedResponse } from '../responses/task-extended.response';
import { TasksExtendedResponse } from '../responses/tasks-extended.response';
import { JwtGuard } from '../../security/guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { CategoryByIdPipe } from '../pipes/category-by-id.pipe';
import { ApiEndpoint } from '../../utils/documentation/api-endpoint.decorator';
import { WorkspaceByIdPipe } from '../pipes/workspace-by-id.pipe';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { Permissions } from '../../security/permissions';
import { WorkspaceWithUserPipe } from '../pipes/workspace-with-user.pipe';

@ApiTags('Tasks')
@Controller({
  version: '1',
  path: 'tasks',
})
export class TaskController {
  constructor (private taskService: TaskService) {}

  @ApiEndpoint({
    summary: 'Get all tasks',
    okResponse: TasksExtendedResponse,
  })
  @Get()
  getAll () {
    return this.taskService.getAll();
  }

  @ApiEndpoint({
    summary: 'Get task by id',
    params: {
      name: 'taskId',
      description: 'Id of the task',
    },
    okResponse: TaskExtendedResponse,
    badRequestResponse: `
    InvalidEntityPropertyException:
      Task with such id not found`,
  })
  @Get('/:taskId')
  getById (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.getById(taskId);
  }

  @ApiEndpoint({
    summary: 'Create task',
    guards: JwtGuard,
    okResponse: TaskExtendedResponse,
    badRequestResponse: `
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

    InvalidEntityPropertyException:
      Category with such id not found
      Workspace with such id not found
      Workspace with such user not found
      User with such id not found

    UnauthorizedException:
      Unauthorized`,
  })
  @Post()
  create (
    @CurrentUser('id', WorkspaceWithUserPipe) userId: string,
    @Body(
      CategoryByIdPipe,
      WorkspaceByIdPipe,
    ) body: CreateTaskDto,
    @Body('assignedUserId', UserByIdPipe, WorkspaceWithUserPipe) assignedUserId?: string,
  ) {
    return this.taskService.create(userId, {
      ...body,
      assignedUserId,
    });
  }

  @ApiEndpoint({
    summary: 'Update task by id',
    permissions: Permissions.TASKS_$TASKID_UPDATE,
    params: {
      name: 'taskId',
      description: 'Id of the task',
    },
    okResponse: TaskExtendedResponse,
    badRequestResponse: `
    InvalidBodyException: 
      Name must be a string
      Name length must be between 1 and 20
      Description must be a string
      Status must be an enum
      Priority must be an enum
      Deadline must be a date
      CategoryId must be an UUID

    InvalidEntityPropertyException:
      Task with such id not found
      Category with such id not found
      Workspace with such id not found
      Workspace with such user not found
      User with such id not found

    UnauthorizedException:
      Unauthorized

    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @Patch('/:taskId')
  updateById (
    @Param('taskId', TaskByIdPipe) taskId: string,
    @Body(
      CategoryByIdPipe,
      WorkspaceByIdPipe,
    ) body: UpdateTaskDto,
    @Body('assignedUserId', UserByIdPipe, WorkspaceWithUserPipe) assignedUserId?: string,
  ) {
    return this.taskService.updateById(taskId, {
      ...body,
      assignedUserId,
    });
  }

  @ApiEndpoint({
    summary: 'Delete task by id',
    permissions: Permissions.TASKS_$TASKID_DELETE,
    params: {
      name: 'taskId',
      description: 'Id of the task',
    },
    okResponse: TaskExtendedResponse,
    badRequestResponse: `
    InvalidEntityPropertyException:
      Task with such id not found

    UnauthorizedException:
      Unauthorized

    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @Delete('/:taskId')
  deleteById (@Param('taskId', TaskByIdPipe) taskId: string) {
    return this.taskService.deleteById(taskId);
  }
}
