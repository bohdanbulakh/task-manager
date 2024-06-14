import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskRepository } from '../database/repositories/task.repository';
import { CategoryRepository } from '../database/repositories/category.repository';
import { UserRepository } from '../database/repositories/user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    TaskRepository,
    CategoryRepository,
    UserRepository,
  ],
  exports: [
    PrismaService,
    TaskRepository,
    CategoryRepository,
    UserRepository,
  ],
})
export class PrismaModule {}
