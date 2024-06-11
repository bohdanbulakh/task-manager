import { DbTask } from '../database/entities/db-task';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskMapper {
  getTask (task: DbTask) {
    return {
      ...task,
      category: undefined,
    };
  }

  getTasks (tasks: DbTask[]) {
    return tasks.map((task: DbTask) => this.getTask(task));
  }
}
