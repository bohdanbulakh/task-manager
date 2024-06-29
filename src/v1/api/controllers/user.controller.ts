import { Controller, Get, Param } from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { ApiTags } from '@nestjs/swagger';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { ApiEndpoint } from '../../utils/documentation/api-endpoint.decorator';
import { CategoryService } from '../services/category.service';
import { CategoriesExtendedResponse } from '../responses/categories-extended.response';
import { TasksExtendedResponse } from '../responses/tasks-extended.response';
import { TaskService } from '../services/task.service';
import { WorkspacesWithUserRoleResponse } from '../responses/workspaces-with-user-role.response';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor (
    private workspaceService: WorkspaceService,
    private categoryService: CategoryService,
    private taskService: TaskService,
  ) {}

  @ApiEndpoint({
    summary: 'Get workspaces of the user with workspace user role',
    okResponse: WorkspacesWithUserRoleResponse,
    params: {
      name: 'userId',
      description: 'Id of the user',
    },
    badRequestResponse: `
    InvalidEntityPropertyException:
      User with such id is not found`,
  })
  @Get('/:userId/workspaces')
  getUserWorkspaces (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.workspaceService.getUserWorkspacesWithRoles(userId);
  }

  @ApiEndpoint({
    summary: 'Get categories of the user',
    okResponse: CategoriesExtendedResponse,
    params: {
      name: 'userId',
      description: 'Id of the user',
    },
    badRequestResponse: `
    InvalidEntityPropertyException:
      User with such id is not found`,
  })
  @Get('/:userId/categories')
  getUserCategories (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.categoryService.getUserCategories(userId);
  }

  @ApiEndpoint({
    summary: 'Get tasks created by the user',
    params: {
      name: 'userId',
      description: 'Id of the user',
    },
    okResponse: TasksExtendedResponse,
    badRequestResponse: `
    InvalidEntityPropertyException:
      User with such id is not found`,
  })
  @Get('/:userId/tasks/created')
  getUserCreatedTasks (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.taskService.getCreatedByUser(userId);
  }

  @ApiEndpoint({
    summary: 'Get tasks assigned to the user',
    params: {
      name: 'userId',
      description: 'Id of the user',
    },
    okResponse: TasksExtendedResponse,
    badRequestResponse: `
    InvalidEntityPropertyException:
      User with such id is not found`,
  })
  @Get('/:userId/tasks/assigned')
  getUserAssignedTasks (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.taskService.getAssignedToUser(userId);
  }
}
