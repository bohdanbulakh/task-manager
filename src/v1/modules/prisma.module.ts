import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskRepository } from '../database/repositories/task.repository';
import { CategoryRepository } from '../database/repositories/category.repository';

@Global()
@Module({
  providers: [PrismaService, TaskRepository, CategoryRepository],
  exports: [PrismaService, TaskRepository, CategoryRepository],
})
export class PrismaModule {}
