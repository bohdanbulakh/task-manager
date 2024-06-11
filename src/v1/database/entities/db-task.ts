import { Priority, Status, Category } from '@prisma/client';

export class DbTask {
  id: string;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline?: Date;
  category?: Category;
}
