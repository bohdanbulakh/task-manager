import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor (private taskRepository: TaskRepository) {}

  async getAll () {
    return this.taskRepository.findMany();
  }

  async get (id: string) {
    return this.taskRepository.findById(id);
  }

  async create (body: CreateTaskDto) {
    return this.taskRepository.create(body);
  }

  async update (id: string, body: UpdateTaskDto) {
    return this.taskRepository.update(id, body);
  }

  async deleteById (id: string) {
    return this.taskRepository.delete(id);
  }
}
