import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TaskMapper {
  getTask (task: Task) {
    return {
      ...task,
      category: undefined,
    };
  }

  getTasks (tasks: Task[]) {
    return tasks.map((task: Task) => this.getTask(task));
  }
}
