import { Injectable, PipeTransform } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';

@Injectable()
export class TaskByIdPipe implements PipeTransform {
  constructor (private taskRepository: TaskRepository) {}

  async transform (id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new InvalidEntityPropertyException('Task', 'id');
    }

    return id;
  }
}
