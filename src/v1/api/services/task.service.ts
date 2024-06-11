import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../database/repositories/task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';

@Injectable()
export class TaskService {
  constructor (
    private taskRepository: TaskRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async getAll () {
    const tasks = await this.taskRepository.findMany();
    return { tasks };
  }

  async getById (id: string) {
    return this.taskRepository.findById(id);
  }

  async create (body: CreateTaskDto) {
    await this.checkCategory(body.categoryId);
    return this.taskRepository.create(body);
  }

  async updateById (id: string, body: UpdateTaskDto) {
    await this.checkCategory(body.categoryId);
    return this.taskRepository.update(id, body);
  }

  async deleteById (id: string) {
    return this.taskRepository.delete(id);
  }

  private async checkCategory (categoryId: string) {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new InvalidEntityIdException('Category');
    }
  }
}
