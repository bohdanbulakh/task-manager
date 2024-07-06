import { WorkspaceService } from '../services/workspace.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { JwtGuard } from '../../security/guards/jwt.guard';
import { WorkspaceByIdPipe } from '../pipes/workspace-by-id.pipe';
import { ApiEndpoint } from '../../utils/documentation/api-endpoint.decorator';
import { WorkspacesResponse } from '../responses/workspaces.response';
import { WorkspaceResponse } from '../responses/workspace.response';

@ApiTags('Workspaces')
@Controller('/workspaces')
export class WorkspaceController {
  constructor (private workspaceService: WorkspaceService) {}

  @ApiEndpoint({
    summary: 'Get all workspaces',
    okResponse: WorkspacesResponse,
  })
  @Get()
  async getAll () {
    return this.workspaceService.findAll();
  }

  @ApiEndpoint({
    summary: 'Get workspace by id',
    params: {
      name: 'workspaceId',
      description: 'Id of the workspace',
    },
    okResponse: WorkspaceResponse,
    badRequestResponse: `
    InvalidEntityPropertyException:
      Workspace with such id is not found`,
  })
  @Get(':workspaceId')
  async getById (
    @Param('workspaceId', WorkspaceByIdPipe) workspaceId: string,
  ) {
    return this.workspaceService.findById(workspaceId);
  }

  @ApiEndpoint({
    summary: 'Create new workspace',
    guards: JwtGuard,
    okResponse: WorkspaceResponse,
    badRequestResponse: `
    InvalidBodyException
      Workspace name cannot be empty
      Workspace name must be a string
      Description must be a string

    UnauthorizedException:
      Unauthorized`,
  })
  @Post()
  async create (
    @CurrentUser('id') userId: string,
    @Body() workspace: CreateWorkspaceDto,
  ) {
    return this.workspaceService.create(userId, workspace);
  }

  @ApiEndpoint({
    summary: 'Update workspace by id',
    guards: JwtGuard,
    params: {
      name: 'workspaceId',
      description: 'Id of the workspace',
    },
    okResponse: WorkspaceResponse,
    badRequestResponse: `
    InvalidBodyException
      Workspace name cannot be empty
      Workspace name must be a string
      Description must be a string

    InvalidEntityIdException:
      Workspace with such id not found`,
  })
  @Patch('/:workspaceId')
  async updateById (
    @Param('workspaceId', WorkspaceByIdPipe) workspaceId: string,
    @Body() workspace: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.updateById(workspaceId, workspace);
  }

  @ApiEndpoint({
    summary: 'Delete workspace by id',
    guards: JwtGuard,
    params: {
      name: 'workspaceId',
      description: 'Id of the workspace',
    },
    okResponse: WorkspaceResponse,
    badRequestResponse: `
    InvalidEntityIdException:
      Workspace with such id not found`,
  })
  @Delete(':workspaceId')
  async deleteById (
    @Param('workspaceId', WorkspaceByIdPipe) workspaceId: string,
  ) {
    return this.workspaceService.deleteById(workspaceId);
  }
}
