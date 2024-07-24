import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestUtils } from '../../utils/request.utils';
import { WorkspaceService } from '../services/workspace.service';

@Injectable()
export class WorkspaceIdMiddleware implements NestMiddleware {
  constructor (
    private workspaceService: WorkspaceService,
  ) {}

  async use (request: Request, response: Response, next: NextFunction) {
    const taskId = RequestUtils.get(request, 'taskId');
    const categoryId = RequestUtils.get(request, 'categoryId');
    request['workspaceId'] = RequestUtils.get(request, 'workspaceId') ??
      (taskId ? await this.workspaceService.getTaskWorkspace(taskId) :
        categoryId ? await this.workspaceService.getCategoryWorkspace(categoryId) : null);

    return next();
  }
}
