import { Injectable, PipeTransform } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';

@Injectable()
export class TaskByIdPipe implements PipeTransform {
  constructor (private taskRepository: TaskRepository) {}

  async transform (id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new InvalidEntityIdException('Task');
    }

    return id;
  }
}
