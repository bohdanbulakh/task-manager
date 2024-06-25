import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';
import { WorkspaceRepository } from '../../database/repositories/workspace.repository';

@Injectable()
export class WorkspaceByIdPipe implements PipeTransform {
  constructor (private workspaceRepository: WorkspaceRepository) {}

  async transform (data: string | {workspaceId?: string}) {
    const id = (typeof data === 'string') ? data : data.workspaceId;
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new InvalidEntityPropertyException('Workspace', 'id');
    }

    return data;
  }
}
