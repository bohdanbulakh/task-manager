import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestUtils } from '../../utils/request.utils';
import { Request } from 'express';
import { DataNotFoundException } from '../../exceptions/data-not-found.exception';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';
import { WorkspaceUserRepository } from '../../database/repositories/workspace-user.repository';

@Injectable({ scope: Scope.REQUEST })
export class WorkspaceWithUserPipe implements PipeTransform {
  constructor (
    @Inject(REQUEST) private request: Request,
    private workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  async transform (userId: string) {
    const workspaceId = RequestUtils.get(this.request, 'workspaceId');
    if (!workspaceId) {
      throw new DataNotFoundException();
    }

    const workspaceUser = await this.workspaceUserRepository.findWhere({
      userId,
      workspaceId,
    });

    if (!workspaceUser) {
      throw new InvalidEntityPropertyException('Workspace', 'user');
    }

    return userId;
  }
}
