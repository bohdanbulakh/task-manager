import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';

@Injectable()
export class TaskByIdPipe implements PipeTransform {
  constructor (private taskRepository: TaskRepository) {}

  async transform (id: string) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task with such id not found');
    }

    return id;
  }
}
