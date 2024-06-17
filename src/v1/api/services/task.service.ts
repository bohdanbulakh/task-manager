import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CategoryRepository } from '../../database/repositories/category.repository';

@Injectable()
export class TaskService {
  constructor (
    private taskRepository: TaskRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async getAll (userId?: string) {
    const tasks = await this.taskRepository.findMany(userId);
    return { tasks };
  }

  async getById (id: string) {
    return this.taskRepository.findById(id);
  }

  async create (userId: string, body: CreateTaskDto) {
    return this.taskRepository.create(userId, body);
  }

  async updateById (id: string, body: UpdateTaskDto) {
    return this.taskRepository.update(id, body);
  }

  async deleteById (id: string) {
    return this.taskRepository.delete(id);
  }
}
