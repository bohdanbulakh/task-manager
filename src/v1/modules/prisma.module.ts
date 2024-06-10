import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskRepository } from '../database/repositories/task.repository';

@Global()
@Module({
  providers: [PrismaService, TaskRepository],
  exports: [PrismaService, TaskRepository],
})
export class PrismaModule {}
