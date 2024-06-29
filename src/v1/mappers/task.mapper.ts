import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class TaskMapper {
  constructor(private categoryMapper: CategoryMapper) {}
  getTaskWithCategory (task: any) {
    for (const prop in task) {
      if (prop.includes('Id') && !['ownerId', 'assignedUserId'].includes(prop)) {
        delete task[prop];
      }
    }

    task.category = this.categoryMapper.getCategory(task.category);
    return task;
  }

  getTasksWithCategory (tasks: Task[]) {
    return tasks.map((task: Task) => this.getTaskWithCategory(task));
  }
}
