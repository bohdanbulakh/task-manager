import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TaskMapper {
  getTaskWithCategory (task: any) {
    for (const prop in task) {
      if (prop.includes('Id') && !['ownerId', 'assignedUserId'].includes(prop)) {
        delete task[prop];
      }
    }

    return task;
  }

  getTasksWithCategory (tasks: Task[]) {
    return tasks.map((task: Task) => this.getTaskWithCategory(task));
  }
}
