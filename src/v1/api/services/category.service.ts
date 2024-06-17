import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { TaskMapper } from '../../mappers/task.mapper';

@Injectable()
export class CategoryService {
  constructor (
    private categoryRepository: CategoryRepository,
    private taskMapper: TaskMapper,
  ) {}

  async getAll (userId?: string) {
    const categories = await this.categoryRepository.findMany(userId);
    return { categories: categories.map((category) => ({
      ...category,
      tasks: this.taskMapper.getTasks(category.tasks) })),
    };
  }

  async getById (id: string) {
    const category = await this.categoryRepository.findById(id);
    return { ...category, tasks: this.taskMapper.getTasks(category.tasks) };
  }

  async create (userId: string, body: CreateCategoryDto) {
    return this.categoryRepository.create(userId, body);
  }

  async updateById (id: string, body: UpdateCategoryDto) {
    return this.categoryRepository.update(id, body);
  }

  async deleteById (id: string) {
    return this.categoryRepository.delete(id);
  }
}
